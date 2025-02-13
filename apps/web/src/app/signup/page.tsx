"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from "sonner";

export default function SignUp() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const validateForm = () => {
    // Check if all fields are filled
    if (!firstName || !lastName || !email || !password || !rePassword) {
      toast.error("All fields are required.");
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    // Check if passwords match
    if (password !== rePassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    // Validate password strength (e.g., minimum 8 characters, at least one special character)
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and contain at least one letter, one number, and one special character."
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!validateForm()) {
      return; // Stop if validation fails
    }

    try {
      const response = await axios.post("/api/users/register", {
        firstName,
        lastName,
        email,
        password,
      });

      if (response.status === 200) {
        toast.success("Registration successful!");
        router.push("/signin");
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setRePassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              id="firstName"
              placeholder="Enter your first name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              id="lastName"
              placeholder="Enter your last name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="rePassword"
            >
              Re-enter Password
            </label>
            <input
              onChange={(e) => setRePassword(e.target.value)}
              type="password"
              id="rePassword"
              placeholder="Re-enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/signin" className="text-blue-600 hover:underline">
              Sign In
            </a>
          </p>
        </div>
        <Toaster richColors />
      </div>
    </div>
  );
}
