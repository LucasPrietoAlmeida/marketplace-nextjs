"use client";

import { useActionState } from "react";
import { loginAction, type FormState } from "@/lib/actions";

const initialState: FormState = {
    error: "",
    success: false,
};

export default function LoginPage() {
    const [state, formAction, pending] = useActionState(
        loginAction,
        initialState
    );

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">
                Login
            </h1>

            {state.error && (
                <p className="text-red-500 mb-2">
                    {state.error}
                </p>
            )}

            <form
                action={formAction}
                className="space-y-2"
            >
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded"
                />

                <button
                    type="submit"
                    disabled={pending}
                    className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    {pending ? "Loading..." : "Login"}
                </button>
            </form>
        </div>
    );
}