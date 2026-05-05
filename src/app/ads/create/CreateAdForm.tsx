"use client";

import { useActionState } from "react";
import {
    createAdAction,
    type FormState,
} from "@/lib/actions";

const initialState: FormState = {
    error: "",
    success: false,
};

type Props = {
    userId: string;
};

export default function CreateAdForm({
    userId,
}: Props) {
    const createAction = async (
        prevState: FormState,
        formData: FormData
    ): Promise<FormState> => {
        return createAdAction(
            prevState,
            formData,
            userId
        );
    };

    const [state, formAction, pending] =
        useActionState(
            createAction,
            initialState
        );

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">
                Crear nuevo anuncio
            </h1>

            {state.error && (
                <p className="text-red-500 mb-2">
                    {state.error}
                </p>
            )}

            {state.success && (
                <p className="text-green-500 mb-2">
                    Ad created successfully!
                </p>
            )}

            <form
                action={formAction}
                className="space-y-2"
            >
                <input
                    name="title"
                    placeholder="Título"
                    className="w-full border p-2 rounded"
                />

                <textarea
                    name="description"
                    placeholder="Descripción"
                    className="w-full border p-2 rounded"
                />

                <input
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder="Precio"
                    className="w-full border p-2 rounded"
                />

                <input
                    name="tags"
                    placeholder="Tags separados por comas"
                    className="w-full border p-2 rounded"
                />

                <button
                    type="submit"
                    disabled={pending}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    {pending
                        ? "Creating..."
                        : "Crear anuncio"}
                </button>
            </form>
        </div>
    );
}