"use server";

import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export type FormState = {
    error: string;
    success: boolean;
};

const adSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(3),
    price: z.number().positive(),
    tags: z.array(z.string()).optional(),
});

export async function createAd(
    data: {
        title: string;
        description: string;
        price: number;
        tags?: string[];
    },
    userId: string
    ): Promise<FormState> {
    const parsed = adSchema.safeParse(data);

    if (!parsed.success) {
        return {
        error: "Invalid ad data",
        success: false,
        };
    }

    await prisma.ad.create({
        data: {
        title: parsed.data.title,
        description: parsed.data.description,
        price: parsed.data.price,
        tags: parsed.data.tags ?? [],
        userId,
        },
    });

    revalidatePath("/");

    return {
        error: "",
        success: true,
    };
}

export async function createAdAction(
    _prevState: FormState,
    formData: FormData,
    userId: string
    ): Promise<FormState> {
    const data = {
        title: String(formData.get("title") ?? ""),
        description: String(formData.get("description") ?? ""),
        price: Number(formData.get("price")),
        tags: String(formData.get("tags") ?? "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    return await createAd(data, userId);
}

export async function loginAction(
    _prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user || user.password !== password) {
        return {
            error: "Invalid credentials",
            success: false,
        };
    }

    (await cookies()).set("userId", user.id, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24,
    });

    redirect("/ads/create");
}