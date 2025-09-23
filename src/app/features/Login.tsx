"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { storage } from "@/utils/storage";


//  Schema & Types
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?:.*[@$!%*?&-])?[A-Za-z\d@$!%*?&-]{8,}$/,
      "Password must contain at least one uppercase, one lowercase, and a number"
    ),
});

type LoginFormData = z.infer<typeof loginSchema>;

const TOKEN_KEY = "auth_token";
const ROLE_KEY = "role";
const USER_ID_KEY = "userId";


// Login Component
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });


  // Submit Handler
  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      setLoading(true);
      setError(null);

      try {
        const user = await storage.getUserByEmail(data.email);

        if (!user || user.password !== data.password) {
          setError("Invalid email or password");
          return;
        }

        const token = user.token ?? crypto.randomUUID();
        await storage.saveUser({ ...user, token });

        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(ROLE_KEY, user.role ?? "user");
        localStorage.setItem(USER_ID_KEY, user.id);

        router.push("/dashboard");
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : "Login failed. Please try again.";
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [router]
  );


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

          {/* Error */}
          {error && (
            <p
              role="alert"
              className="mb-4 rounded bg-red-100 p-2 text-sm text-red-600"
            >
              {error}
            </p>
          )}

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
