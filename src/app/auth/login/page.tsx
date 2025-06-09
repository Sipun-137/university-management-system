"use client";
import Link from "next/link";
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
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { GlobalContext } from "@/context";
import { Login } from "@/services/AuthServide";
export default function LoginPage() {
  const router = useRouter();

  const { isAuthUser, setAuthUser, setRole, verified, setVerified } =
    useContext(GlobalContext);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async () => {
    // Perform login logic here
    console.log("Email:", formData);

    if (formData.email === "" || formData.password === "") {
      toast.error("Please fill all the fields");
      return;
    }

    const result = await Login(formData);
    console.log(result);
    if (result.success) {
      localStorage.setItem("token", result.token);
      Cookies.set("token", result.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ role: result.role, email: result.email })
      );
      setRole(result.role);
      if (result.isVerified === "VERIFIED") {
        setVerified(true);
      }
      setAuthUser(true);
      toast.success("Login successful");
      setFormData({ email: "", password: "" });
      if (result.isVerified !== "VERIFIED") {
        router.push("/change-password");
      } else {
        router.push("/dashboard");
      }
    } else {
      toast.error(result.message);
      setFormData({ email: "", password: "" });
    }
  };

  useEffect(() => {
    if (isAuthUser) {
      if (verified) {
        setVerified(true);
        router.push("/dashboard"); // ✅ safe to navigate here
      } else {
        router.push("/change-password");
      }
    }
  }, [isAuthUser, router, setVerified, verified]);
  return (
    <>
      <Toaster position="bottom-right" />
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center">
            <div className="rounded-full bg-slate-900 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 1 3 3 3h6c2 0 3-1 3-3v-5" />
              </svg>
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
              University Management System
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Sign in to access your account
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Login</CardTitle>
              <CardDescription>
                Enter your credentials to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@university.edu"
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-slate-600 hover:text-slate-900"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full" onClick={handleSubmit}>
                Sign in
              </Button>
              <div className="text-center text-sm text-slate-600">
                Need help?{" "}
                <Link
                  href="/contact-support"
                  className="font-medium text-slate-900 hover:underline"
                >
                  Contact Support
                </Link>
              </div>
            </CardFooter>
          </Card>

          <div className="text-center text-sm text-slate-600">
            © {new Date().getFullYear()} University Management System. All
            rights reserved.
          </div>
        </div>
      </div>
    </>
  );
}
