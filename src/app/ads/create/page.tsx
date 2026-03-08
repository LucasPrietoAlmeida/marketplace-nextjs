import { redirect } from "next/navigation";
import CreateAdPage from "@/components/CreateAdPage";

interface CreateAdServerProps {
    searchParams: { userId?: string } | Promise<{ userId?: string }>;
}

export default async function CreateAdServer({ searchParams }: CreateAdServerProps) {
    const params = await searchParams;
    const userId = params.userId;

    if (!userId) {
        redirect("/login");
    }

    return <CreateAdPage userId={userId} />;
}