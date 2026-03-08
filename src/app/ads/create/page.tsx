"use client";

import { useState } from "react";
import { createAd } from "@/lib/actions";

interface CreateAdFormProps {
    userId: string;
}

export default function CreateAdPage({ userId }: CreateAdFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [tags, setTags] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await createAd(
        {
            title,
            description,
            price: parseFloat(price),
            tags: tags.split(",").map(t => t.trim()).filter(Boolean),
        },
        userId
        );

        if (result.error) {
        setError(result.error);
        setSuccess(false);
        } else {
        setError("");
        setSuccess(true);
        setTitle("");
        setDescription("");
        setPrice("");
        setTags("");
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Crear nuevo anuncio</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">Ad created successfully!</p>}
        <form onSubmit={handleSubmit} className="space-y-2">
            <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            className="w-full border p-2 rounded"
            />
            <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción"
            className="w-full border p-2 rounded"
            />
            <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Precio"
            type="number"
            className="w-full border p-2 rounded"
            />
            <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (separados por comas)"
            className="w-full border p-2 rounded"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Crear Anuncio
            </button>
        </form>
        </div>
    );
}