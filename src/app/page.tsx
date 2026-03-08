import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

interface HomePageProps {
  searchParams: { userId?: string; query?: string } | Promise<{ userId?: string; query?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams; // <-- Desempaquetamos la Promise

  if (!params.userId) {
    redirect("/login");
  }

  const query = params.query ?? "";

  const ads = await prisma.ad.findMany({
    where: {
      title: { contains: query, mode: "insensitive" },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Marketplace</h1>
      <div className="mb-4">
        <a
          href={`/ads/create?userId=${params.userId}`}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create New Ad
        </a>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {ads.map((ad) => (
          <div key={ad.id} className="border p-4 rounded">
            <h2 className="text-lg font-semibold">{ad.title}</h2>
            <p>{ad.description}</p>
            <p className="font-bold">{ad.price} €</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {ad.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}