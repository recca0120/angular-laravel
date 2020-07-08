<?php

namespace Tests\Feature\Http\Controllers\Api;

use App\Http\Controllers\Api\AuthController;
use App\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_do_login()
    {
        $this->assertLoginResponse();
    }

    public function test_get_user_info()
    {
        $data = $this->assertLoginResponse();

        $response = $this->postJson('/api/auth/me', [], [
            'Authorization' => 'bearer ' . $data->access_token,
        ]);

        $response->assertStatus(Response::HTTP_OK)->assertJson(User::first()->toArray());
    }

    private function assertLoginResponse()
    {
        $user = factory(User::class)->create();

        $response = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $response->assertStatus(Response::HTTP_OK)->assertJsonStructure([
            'access_token', 'token_type', 'expires_in',
        ]);

        return $response->getData();
    }
}
