<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->user();

        // Get the user's email
        $userEmail = $googleUser->getEmail();

        // Define allowed domains
        $allowedDomains = ['alakhyar.sch.id', 'gtk.alakhyar.sch.id', 'student.alakhyar.sch.id'];
        $userEmailDomain = substr(strrchr($googleUser->getEmail(), "@"), 1); // Get domain from email

        // Check if the user's email domain is allowed
        if (!in_array($userEmailDomain, $allowedDomains)) {
            // Redirect back with an error message
            return redirect()->to(config('app.frontend_url').'/login?error=email_domain_not_allowed&email=' . urlencode($userEmail));
        }

        // Check if the user already exists in the database
        $user = User::where('email', $googleUser->getEmail())->first();

        if (!$user) {
            // If the user doesn't exist, create a new user
            $user = User::create([
                'name' => $googleUser->getName(),
                'email' => $googleUser->getEmail(),
                'password' => bcrypt(uniqid()), // Generate a random password
            ]);
        }

        // Log the user in
        Auth::login($user, true);

        // Redirect to your desired location after login
        return redirect()->to(config('app.frontend_url').'/dashboard');
    }

}

