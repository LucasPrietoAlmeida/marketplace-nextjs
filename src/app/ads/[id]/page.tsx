import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface AdPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({
    params,
}: AdPageProps): Promise<Metadata> {
    const { id } = await params;

    const ad = await prisma.ad.findUnique({
        where: { id },
    });

    if (!ad) {
        return {
            title: "Ad Not Found",
            description: "This ad does not exist",
        };
    }

    return {
        title: ad.title,
        description: `Price: ${ad.price} €`,
    };
}

export default async function AdPage({
    params,
}: AdPageProps) {
    const { id } = await params;

    const ad = await prisma.ad.findUnique({
        where: { id },
    });

    if (!ad) {
        notFound();
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">
                {ad.title}
            </h1>

            <p className="text-gray-600">
                {ad.description}
            </p>

            <p className="font-semibold">
                {ad.price} €
            </p>

            <div className="flex flex-wrap gap-1 mt-2">
                {ad.tags.map((tag, i) => (
                    <span
                        key={i}
                        className="text-xs bg-gray-200 dark:bg-gray-200 px-2 py-1 rounded"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}