"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Email validation regex
const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

// Password validation (minimum 6 characters, at least one number, and one letter)
const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return true;
};

const RegisterPage = () => {
  const router = useRouter();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is 'user'
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Show loading indicator

    // Validate email format
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    // Validate phone format
    if (!/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number");
      setLoading(false);
      return;
    }

    // Validate password strength
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 6 characters long and contain both letters and numbers"
      );
      setLoading(false);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Send user data to backend for registration
      const response = await fetch("http://localhost:8800/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone:countryCode+phone,
          password,
          role,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        // If registration fails, show error message from backend
        setError(data.message || "Registration failed. Please try again.");
      } else {
        // Redirect to login page on successful registration
        router.push("loginpage");
      }
    } catch (err) {
      // Handle network errors or unexpected issues
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="flex w-[100vw] justify-center items-center h-screen bg-gray-100 mt-8">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Create an Account
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Phone
            </label>
            <div className="flex items-center">
              {/* Country code dropdown */}
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="p-3 border border-gray-300 rounded-l-md bg-white"
                required
              >
                <option value="+1">+1 (US)</option>
                <option value="+91">+91 (India)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+61">+61 (Australia)</option>
                <option value="+81">+81 (Japan)</option>
                <option value="+49">+49 (Germany)</option>
                {/* Add more country codes as needed */}
              </select>

              {/* Phone number input */}
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-r-md"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="tenant">Tenant</option>
              <option value="landlord">Landlord</option>
              <option value="broker">Broker</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <p className="text-xs text-gray-600 mt-2">
              Password must be at least 6 characters and contain both letters
              and numbers
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-300 disabled:bg-gray-400"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
