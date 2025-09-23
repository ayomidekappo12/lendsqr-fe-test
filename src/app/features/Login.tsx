"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { storage } from "@/utils/storage";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import loginIllustration from "@/assets/login-illustration.png"; // make sure you add this

const loginSchema = z.object({
  email: z.email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?:.*[@$!%*?&-])?[A-Za-z\d@$!%*?&-]{8,}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and a numerical value",
      }
    ),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

const onSubmit = async (data: LoginFormData) => {
  setLoading(true);
  setError("");

  try {
    const user = await storage.getUserByEmail(data.email);

    if (!user || user.password !== data.password) {
      setError("Invalid email or password");
      return;
    }

    // If no token, generate one
    const token = user.token ?? crypto.randomUUID();
    await storage.saveUser({ ...user, token });

    localStorage.setItem("auth_token", token);
    localStorage.setItem("role", user.role ?? "user");
    localStorage.setItem("userId", user.id);

    router.push("/dashboard");
  } catch (err: any) {
    setError(err.message || "Login failed. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gray-50 p-12">
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">L</span>
            </div>
            <span className="text-2xl font-bold text-foreground">lendsqr</span>
          </div>
          <Image
            src={
              "https://res.cloudinary.com/dxvf9uqwe/image/upload/v1758583828/pablo-sign-in_1_gctdra.svg"
            }
            alt="logo"
            width={1500}
            height={1500}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">L</span>
            </div>
            <span className="text-2xl font-bold text-foreground">lendsqr</span>
          </div>

          {/* Welcome message */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-text-primary mb-2">
              Welcome!
            </h1>
            <p className="text-text-secondary">Enter details to login.</p>
          </div>

          {error && (
            <p className="mb-4 rounded bg-red-100 p-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="sr-only">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="h-12 text-base"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="h-12 text-base pr-12"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:bg-primary text-sm font-medium cursor-pointer"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            <div className="text-left">
              <a
                href="#"
                className="text-sm text-primary hover:text-primary-hover cursor-pointer"
              >
                FORGOT PASSWORD?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary-hover cursor-pointer"
              disabled={loading}
            >
              {loading ? "LOGGING IN..." : "LOG IN"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
