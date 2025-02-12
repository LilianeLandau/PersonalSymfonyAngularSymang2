<?php
// src/Controller/SecurityController.php

namespace App\Controller;

use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use App\Entity\User;

class SecurityController extends AbstractController
{
    private JWTTokenManagerInterface $jwtManager;

    public function __construct(JWTTokenManagerInterface $jwtManager)
    {
        $this->jwtManager = $jwtManager;
    }

    #[Route('/api/login2', name: 'api_login', methods: ['POST'])]
    public function login(#[CurrentUser] ?User $user): JsonResponse
    {
        if (null === $user) {
            return $this->json([
                'message' => 'Identifiants invalides'
            ], 401);
        }

        $token = $this->jwtManager->create($user);
        $roles = $user->getRoles();

        // Déterminer l'URL de redirection en fonction du rôle
        $redirectUrl = in_array('ROLE_ADMIN', $roles) ? '/users' : '/welcome';

        return $this->json([
            'token' => $token,
            'roles' => $roles,
            'redirectUrl' => $redirectUrl,
            'email' => $user->getEmail()
        ]);
    }
}
