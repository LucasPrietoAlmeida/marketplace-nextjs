"use client";

import { useState } from "react";
import { login } from "@/lib/actions";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await login({ email, password });
        if (result.error) {
        setError(result.error);
        } else {
        window.location.href = "/";
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm space-y-4"
        >
            <h1 className="text-xl font-bold text-center text-gray-800 dark:text-gray-200">Login</h1>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
            Login
            </button>
        </form>
        </div>
    );
}