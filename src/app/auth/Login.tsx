"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Zod schema for validation
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Submit Handler
  const onSubmit = async (data: LoginForm) => {
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, accept any valid credentials
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", data.email);

      toast.success(
      <div>
        <span className="text-text-primary font-semibold"> 
          Logged in successfully!
        </span>
      </div>
      );
      router.push("/features/Dashboard");
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left side illustration */}
      <aside className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gray-50 p-12">
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-28">
            <Image
              src="https://res.cloudinary.com/dxvf9uqwe/image/upload/v1758654234/Union_lzcwgo.svg"
              alt="Lendsqr logo"
              width={20}
              height={19}
              priority
            />
            <span className="text-2xl font-bold text-text-primary">
              lendsqr
            </span>
          </div>
          <Image
            src="https://res.cloudinary.com/dxvf9uqwe/image/upload/v1758654236/pablo-sign-in_1_qly0ff.svg"
            alt="Login illustration"
            width={500}
            height={500}
            priority
          />
        </div>
      </aside>

      {/* Right side login form */}
      <main className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <Image
              src="https://res.cloudinary.com/dxvf9uqwe/image/upload/v1758654234/Union_lzcwgo.svg"
              alt="Lendsqr logo"
              width={50}
              height={50}
              priority
            />
            <span className="text-3xl font-bold text-text-primary">
              lendsqr
            </span>
          </div>

          {/* Welcome text */}
          <header className="flex flex-col items-center md:items-start mb-8">
            <h1 className="text-4xl font-bold text-text-primary mb-2">
              Welcome!
            </h1>
            <p className="text-text-secondary text-lg">
              Enter details to login.
            </p>
          </header>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-6"
            aria-busy={loading}
          >
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="h-12 text-base border-border"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
              />
              {errors.email && (
                <p
                  id="email-error"
                  role="alert"
                  className="text-xs text-red-500"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="h-12 text-base pr-12 border-border"
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  {...register("password")}
                />
                {errors.password && (
                  <p
                    id="password-error"
                    role="alert"
                    className="mt-1 text-xs text-red-500"
                  >
                    {errors.password.message}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary text-xs font-semibold"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="text-left">
              <a
                href="#"
                className="text-xs font-semibold text-primary hover:text-primary-hover"
              >
                FORGOT PASSWORD?
              </a>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-12 text-sm font-semibold bg-primary hover:bg-primary-hover rounded-lg cursor-pointer"
              disabled={loading}
            >
              {loading ? "LOGGING IN..." : "LOG IN"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
