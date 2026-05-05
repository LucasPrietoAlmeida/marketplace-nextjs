import Link from "next/link";

export type AdType = {
    id: string;
    title: string;
    description: string;
    price: number;
    tags: string[];
    createdAt: string;
    userId: string;
};

interface AdCardProps {
    ad: AdType;
}

export default function AdCard({ ad }: AdCardProps) {
    return (

        <Link
            href={`/ads/${ad.id}`}
            className="group block rounded-xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:bg-gray-50 hover:shadow-xl"
        >
            <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {ad.title}
            </h2>

            <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                {ad.description}
            </p>

            <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                    {ad.price} €
                </span>

                <div className="flex flex-wrap gap-2">
                    {ad.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-indigo-100 px-2 py-1 text-xs text-indigo-800"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}