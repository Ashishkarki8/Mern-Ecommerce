import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, MailOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/store/auth-slice";

// Zod schema for form validation
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
});

const AuthLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, isAuthenticated, isLoading, error } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(loginUser(data)).unwrap();
      if (result.success) {
        toast.success(result.message, { duration: 3000 });
        // You can add navigation here if needed
      }
    } catch (error) {
      toast.error(error.message || "Login failed", { duration: 2000 });
    }
  };

  const handleGoogleLogin = (event) => {
    event.preventDefault();
    window.location.href = "http://localhost:9000/api/auth/google";
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="bg-white">
      <div className="flex items-center justify-center px-4 py-10 bg-white border sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
            Sign In
          </h2>

          {/* <p className="mt-2 text-base text-gray-600">
            Don't have an account?
            <Link
              className="py-2 ml-2 text-blue-700 hover:underline"
              to="/auth/register"
            >
              Create one
            </Link>
          </p> */}

          <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="mt-1"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pr-10 mt-1"
                  {...register("password")}
                  // autoComplete="new-password" 
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-3">
            <Button
              onClick={handleGoogleLogin}
              className="w-full"
              variant="destructive"
            >
              <MailOpen className="mr-2" size={18} /> Login with Email
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLogin;