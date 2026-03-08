import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  if (!userId) redirect("/login");

  const ads = await prisma.ad.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Marketplace</h1>
      {ads.map(ad => (
        <Link key={ad.id} href={`/ads/${ad.id}`}>
          <div className="border p-4 mb-2 hover:bg-gray-100">
            <h2 className="font-semibold">{ad.title}</h2>
            <p>{ad.price} €</p>
          </div>
        </Link>
      ))}
    </div>
  );
}