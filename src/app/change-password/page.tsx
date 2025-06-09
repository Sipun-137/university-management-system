/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  KeyRound,
} from "lucide-react";

// import { markFirstLoginCompleted } from "@/lib/auth-utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Changepassword } from "@/services/AuthServide";

export default function ChangePasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";
  const isFirstLogin = searchParams.get("firstLogin") === "true";

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState("");

  // Check password strength
  useEffect(() => {
    if (!newPassword) {
      setPasswordStrength(0);
      setPasswordFeedback("");
      return;
    }

    // Simple password strength check
    let strength = 0;
    let feedback = "";

    if (newPassword.length >= 8) {
      strength += 1;
    } else {
      feedback = "Password should be at least 8 characters";
    }

    if (/[A-Z]/.test(newPassword)) {
      strength += 1;
    } else if (!feedback) {
      feedback = "Add an uppercase letter";
    }

    if (/[a-z]/.test(newPassword)) {
      strength += 1;
    } else if (!feedback) {
      feedback = "Add a lowercase letter";
    }

    if (/[0-9]/.test(newPassword)) {
      strength += 1;
    } else if (!feedback) {
      feedback = "Add a number";
    }

    if (/[^A-Za-z0-9]/.test(newPassword)) {
      strength += 1;
    } else if (!feedback) {
      feedback = "Add a special character";
    }

    setPasswordStrength(strength);
    setPasswordFeedback(feedback);
  }, [newPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError("New passwords don't match");
      return;
    }

    if (passwordStrength < 3) {
      setError("Please choose a stronger password");
      return;
    }

    setIsLoading(true);

    try {
      const response = await Changepassword({
        oldPassword: currentPassword,
        newPassword: newPassword,
      });

      console.log(response);
      if (response.success && response.isVerified === "VERIFIED") {
        router.push(redirectTo);
      } else {
        setError("Failed to change password. Please try again.");
      }
    } catch (err) {
      setError("Failed to change password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Change Password</CardTitle>
          <CardDescription>
            {isFirstLogin
              ? "You must change your password before continuing"
              : "Update your password to keep your account secure"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showCurrentPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showNewPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>

              {/* Password strength indicator */}
              {newPassword && (
                <div className="mt-2 space-y-2">
                  <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`transition-all duration-300 ${
                        passwordStrength === 0
                          ? "w-0"
                          : passwordStrength === 1
                          ? "w-1/5 bg-red-500"
                          : passwordStrength === 2
                          ? "w-2/5 bg-orange-500"
                          : passwordStrength === 3
                          ? "w-3/5 bg-yellow-500"
                          : passwordStrength === 4
                          ? "w-4/5 bg-lime-500"
                          : "w-full bg-green-500"
                      }`}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {passwordFeedback ||
                      (passwordStrength <= 2
                        ? "Weak password"
                        : passwordStrength <= 4
                        ? "Good password"
                        : "Strong password")}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showConfirmPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500" />
                <span>At least 8 characters</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500" />
                <span>Mix of uppercase & lowercase letters</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500" />
                <span>Include numbers and special characters</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <KeyRound className="h-4 w-4 animate-pulse" />
                  Changing Password...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Change Password
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
