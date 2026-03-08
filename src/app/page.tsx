import { prisma } from "@/lib/prisma";
import AdCard from "@/components/AdCard";

interface PageProps {
  searchParams?: { query?: string };
}

type AdType = Awaited<ReturnType<typeof prisma.ad.findMany>>[number];

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = params?.query ?? "";

  await new Promise((resolve) => setTimeout(resolve, 1000));

  let ads: AdType[] = [];
  try {
    ads = await prisma.ad.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching ads:", error);
  }

  return (
    <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {ads.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">
          No hay anuncios disponibles
        </p>
      ) : (
        ads.map((ad) => (
          <AdCard
            key={ad.id}
            title={ad.title}
            description={ad.description}
            price={ad.price}
            tags={ad.tags}
          />
        ))
      )}
    </main>
  );
}