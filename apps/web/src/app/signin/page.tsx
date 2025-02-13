"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from "sonner";

export default function SignIn() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const validate = () => {
    let isValid = true;
    const newErrors = { username: "", password: "" };

    if (!username) {
      newErrors.username = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
      newErrors.username = "Invalid email format";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    if (!validate()) return;

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      toast.error("Invalid credentials. Please try again.");
    } else {
      toast.success("Signed in successfully!");
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Sign In
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
        <Toaster richColors />
      </div>
    </div>
  );
}
