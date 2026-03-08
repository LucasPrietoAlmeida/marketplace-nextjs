import AdLoading from "@/components/AdLoading";
import AdCard, { AdType } from "@/components/AdCard";
import { prisma } from "@/lib/prisma";

interface PageProps {
  searchParams?: { query?: string };
}

export default async function HomePage({ searchParams }: PageProps) {
  const query = searchParams?.query ?? "";

  let ads: AdType[] = [];

  try {
    const rawAds = await prisma.ad.findMany({
      where: { title: { contains: query, mode: "insensitive" } },
      orderBy: { createdAt: "desc" },
      take: 6,
    });

    ads = rawAds.map((ad) => ({
      ...ad,
      createdAt: ad.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="p-4">
      {ads.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      ) : (
        <AdLoading />
      )}
    </div>
  );
}