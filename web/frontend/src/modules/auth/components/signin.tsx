"use client";

import { Mail } from "lucide-react";
import { useState } from "react";

import { Card } from "./card";
import { FormHeader } from "./form-header";
import { InputField } from "./input-field";
import { PasswordField } from "./password-field";
import { Checkbox } from "./checkbox";
import { Link } from "./link";
import { Button } from "./button";
import { Divider } from "./divider";
import { SocialButton } from "./social-button";
import { GradientBackground } from "./gradient-background";
import { HeroSection } from "./hero-section";
import { FormFooter } from "./form-footer";

// ============================================================================
// MAIN SIGNIN COMPONENT
// ============================================================================

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in attempt:", { email, password, rememberMe });
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign in clicked");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row w-full">
      {/* Left Side - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <FormHeader
            title="Welcome back"
            subtitle="Sign in to your account to continue"
          />

          <Card className="p-6 sm:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                id="email"
                type="email"
                label="Email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Mail}
                required
              />

              <PasswordField
                id="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                required
              />

              <div className="flex items-center justify-between text-sm">
                <Checkbox
                  id="remember"
                  label="Remember me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <Link href="#">Forgot password?</Link>
              </div>

              <Button type="submit" variant="primary" fullWidth>
                Sign in
              </Button>

              <Divider text="Or continue with" />

              <SocialButton provider="google" onClick={handleGoogleSignIn}>
                Continue with Google
              </SocialButton>
            </form>

            <FormFooter
              text="Don't have an account?"
              linkText="Sign up"
              linkHref="#"
            />
          </Card>
        </div>
      </div>

      {/* Right Side - Hero Section with Gradient Background */}
      <GradientBackground variant="dark">
        <HeroSection
          title="Secure Authentication"
          description="Your data is protected with industry-standard encryption and security measures. Sign in with confidence."
          icon={
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          }
          showProgress
        />
      </GradientBackground>
    </div>
  );
};

export default SignIn;
