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
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Listado de productos
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ads.map((ad) => (
          <Link key={ad.id} href={`/ads/${ad.id}`}>
            <div className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-gray-300">
              
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {ad.title}
              </h2>

              <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                {ad.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  {ad.price} €
                </span>

                <span className="text-xs text-gray-400">
                  Ver detalle →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}