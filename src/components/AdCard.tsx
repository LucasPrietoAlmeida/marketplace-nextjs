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
        <div className="border rounded-lg p-4 bg-white dark:bg-gray-900 space-y-2">
        <h2 className="text-lg font-bold">{ad.title}</h2>
        <p className="text-gray-600 dark:text-gray-300">{ad.description}</p>
        <p className="font-semibold">{ad.price} €</p>
        <div className="flex flex-wrap gap-1">
            {ad.tags.map((tag) => (
            <span
                key={tag}
                className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
            >
                {tag}
            </span>
            ))}
        </div>
        </div>
    );
}