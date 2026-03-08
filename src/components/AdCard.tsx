import React from "react";

interface AdCardProps {
    title: string;
    description: string;
    price: number;
    tags: string[];
}

export default function AdCard({ title, description, price, tags }: AdCardProps) {
    return (
        <div className="border rounded p-4 shadow hover:shadow-lg transition">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-700">{description}</p>
        <p className="text-green-600 font-semibold">${price}</p>
        <div className="flex gap-2 mt-2">
            {tags.map((tag) => (
            <span key={tag} className="bg-gray-200 px-2 py-1 rounded text-sm">
                {tag}
            </span>
            ))}
        </div>
        </div>
    );
}