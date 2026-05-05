import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CreateAdForm from "./CreateAdForm";

export default async function CreateAdPage() {
    const userId = (await cookies()).get("userId")?.value;

    if (!userId) {
        redirect("/login");
    }

    return <CreateAdForm userId={userId} />;
}