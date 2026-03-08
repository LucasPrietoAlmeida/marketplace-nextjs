"use client";

import { useState } from "react";
import { login } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await login({ email, password });

        if (result.error) {
        setError(result.error);
        } else {
        setError("");
        router.push(`/?userId=${result.userId}`);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-2">
            <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border p-2 rounded"
            />
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border p-2 rounded"
            />
            <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
            >
            Login
            </button>
        </form>
        </div>
    );
}