import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

interface AdPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: AdPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!id) return { title: "Ad Not Found", description: "This ad does not exist" };

    const ad = await prisma.ad.findUnique({ where: { id } });

    return {
        title: ad?.title ?? "Ad Not Found",
        description: ad ? `Price: ${ad.price} €` : "This ad does not exist",
    };
}


export default async function AdPage({ params }: AdPageProps) {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!id) return <div className="p-4">Ad not found</div>;

    const ad = await prisma.ad.findUnique({ where: { id } });

    if (!ad) return <div className="p-4">Ad not found</div>;

    return (
        <div className="p-4">
        <h1 className="text-2xl font-bold">{ad.title}</h1>
        <p className="text-gray-600">{ad.description}</p>
        <p className="font-semibold">{ad.price} €</p>
        <div className="flex flex-wrap gap-1 mt-2">
            {ad.tags.map((tag, i) => (
            <span key={i} className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                {tag}
            </span>
            ))}
        </div>
        </div>
    );
}