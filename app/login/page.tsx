"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      console.log("LOGIN SUCCESS:", result.user.uid);
      console.log("USER EMAIL:", result.user.email);

      // Firebase login successful
      router.replace("/dashboard");

    } catch (err: unknown) {
      console.error("LOGIN ERROR:", err);

      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err
      ) {
        const firebaseError = err as { code?: string };

        switch (firebaseError.code) {
          case "auth/invalid-credential":
            setError("Email ya password galat hai.");
            break;

          case "auth/user-not-found":
            setError("Is email ka account Firebase mein nahi hai.");
            break;

          case "auth/wrong-password":
            setError("Password galat hai.");
            break;

          case "auth/invalid-email":
            setError("Email address sahi nahi hai.");
            break;

          case "auth/too-many-requests":
            setError(
              "Bahut attempts ho gaye. Thodi der baad dobara try karo."
            );
            break;

          default:
            setError(
              `Login failed: ${firebaseError.code || "Unknown error"}`
            );
        }
      } else {
        setError("Login nahi ho paya. Dobara try karo.");
      }

    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080808] px-6 text-white">

      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            NEXORA
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Owner OS
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">

          <h2 className="text-2xl font-semibold">
            Welcome back
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to your workspace.
          </p>

          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-5"
          >

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Email
              </label>

              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Password
              </label>

              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-purple-500"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-white px-4 py-3 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>

        </div>

      </div>

    </main>
  );
}