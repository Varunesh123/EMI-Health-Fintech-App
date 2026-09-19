import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";

import { C } from "../constants/design";
import { useAuthStore } from "../store/authStore";


export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");


  const from =
    (location.state as { from?: string } | null)?.from ??
    "/dashboard";


  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      await login({
        email,
        password,
      });

      navigate(from, { replace: true });

    } catch (error: any) {
      setError(
        error?.response?.data?.detail ??
          "Unable to sign in. Please check your credentials.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-12"
      style={{ backgroundColor: C.navy950 }}
    >
      <div className="w-full max-w-md">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center justify-center gap-2 mb-10"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: C.indigo600 }}
          >
            <ShieldCheck
              size={22}
              color="white"
            />
          </div>

          <span
            className="text-xl font-bold"
            style={{ color: "white" }}
          >
            EMI Health
          </span>
        </Link>


        {/* Card */}
        <div
          className="rounded-2xl p-8 border"
          style={{
            backgroundColor: C.white,
            borderColor: C.slate200,
          }}
        >

          <div className="mb-8">
            <h1
              className="text-2xl font-bold"
              style={{ color: C.navy900 }}
            >
              Welcome back
            </h1>

            <p
              className="mt-2 text-sm"
              style={{ color: C.slate600 }}
            >
              Sign in to manage your EMI health.
            </p>
          </div>


          {error && (
            <div
              className="mb-5 rounded-lg px-4 py-3 text-sm"
              style={{
                backgroundColor: C.re50,
                color: C.re700,
              }}
            >
              {error}
            </div>
          )}


          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2"
                style={{ color: C.slate700 }}
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2"
                style={{
                  borderColor: C.slate300,
                  color: C.navy900,
                }}
              />
            </div>


            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
                style={{ color: C.slate700 }}
              >
                Password
              </label>

              <div className="relative">

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border px-4 py-3 pr-12 text-sm outline-none"
                  style={{
                    borderColor: C.slate300,
                    color: C.navy900,
                  }}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((value) => !value)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: C.slate500 }}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>
            </div>


            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl py-3.5 px-4 flex items-center justify-center gap-2 text-sm font-semibold transition disabled:opacity-60"
              style={{
                backgroundColor: C.indigo600,
                color: "white",
              }}
            >
              {isSubmitting
                ? "Signing in..."
                : "Sign in"}

              {!isSubmitting && (
                <ArrowRight size={17} />
              )}
            </button>

          </form>


          {/* Register */}
          <p
            className="text-center text-sm mt-7"
            style={{ color: C.slate600 }}
          >
            Don't have an account?{" "}

            <Link
              to="/register"
              className="font-semibold"
              style={{ color: C.indigo600 }}
            >
              Create account
            </Link>
          </p>

        </div>


        <p
          className="text-center text-xs mt-6"
          style={{ color: C.slate400 }}
        >
          Your financial data is protected with secure authentication.
        </p>

      </div>
    </div>
  );
}