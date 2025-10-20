"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {FcGoogle} from "react-icons/fc";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

   if (res?.error) {
      setError("Invalid email or password");
      toast.error("Login failed. Please check your credentials.");
    } else {
      toast.success("Login successful!");
      router.push("/dashboard");
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    toast.loading("Redirecting to Google...");
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--background)]">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg p-8 shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-[var(--brand-gold)]">
          Admin Login
        </h1>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-[var(--brand-gold)] text-black font-semibold py-2 rounded hover:opacity-90"
        >
           {loading ? "Logging in..." : "Login"}
        </button>
        {/* OR Divider */}
        <div className="my-6 text-center text-gray-400 text-sm">OR</div>
           
           {/* Google Sign-In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full gap-2 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <FcGoogle size={22} />
          <span>Continue with Google</span>
        </button>
      </form>
    </div>
  );
}
