"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// Email validation regex
const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

// Password validation (example: password length should be at least 6 characters)
const validatePassword = (password: string) => {
  return true;
  //   return password.length >= 6; // Example: Password should be at least 6 characters long
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ email?: string; password?: string }>({});
  const [loginError, setLoginError] = useState("");
  const router = useRouter();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isLoggedin'); // Check if user is logged in
    if (isAuthenticated) {
      router.push('dashboardpage');  // Navigate to login page if not logged in
      return;
    }

  },[]
)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};
    
    // Validate email and password
    if (!email || !password) {
      if (!email) newErrors.email = "Email is required";
      if (!password) newErrors.password = "Password is required";
    } else {
      // Email format validation
      if (!validateEmail(email)) {
        newErrors.email = "Please enter a valid email address";
      }

      // Password validation (length check)
      if (!validatePassword(password)) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    // If there are validation errors, set them and return early
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    try {
      // Send POST request to backend for authentication
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setLoginError(data.message || "Invalid credentials");
      } else {
        // Handle successful login (e.g., store the token, redirect, etc.)
        console.log("hello");
        const res = await response.json();
        console.log("Login Successful:", JSON.stringify(res));
        // For example, save token to local storage
        localStorage.setItem("userDetails", JSON.stringify(res));
        localStorage.setItem("isLoggedin", 'yes');
        window.location.href = "dashboardpage"; // Redirect to dashboard or another page
      }
    } catch (err) {
      setLoginError("Something went wrong. Please try again.");
    }
  };

  // Clear specific error when the user starts typing in the email or password field
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError((prevError) => ({ ...prevError, email: "" })); // Clear email error
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError((prevError) => ({ ...prevError, password: "" })); // Clear password error
  };

  return (
    <div className="flex w-[100vw] items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Login
        </h2>
        {loginError && (
          <div className="text-red-500 text-sm mb-4">{loginError}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {error.email && (
              <div className="text-red-500 text-sm mt-1">{error.email}</div>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {error.password && (
              <div className="text-red-500 text-sm mt-1">{error.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="registerpage" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
