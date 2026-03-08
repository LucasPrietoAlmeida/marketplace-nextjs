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
        <Link href={`/ads/${ad.id}`} className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition">{ad.title}</h2>
        <p className="text-gray-600 mt-2 text-sm line-clamp-3">{ad.description}</p>
        <div className="flex justify-between items-center mt-4">
            <span className="text-indigo-600 font-bold text-lg">${ad.price}</span>
            <div className="flex flex-wrap gap-2">
            {ad.tags.map((tag) =>  (
                <span key={tag} className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">{tag}</span>
            ))}
            </div>
        </div>
        </Link>
    );
}