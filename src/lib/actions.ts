"use server";

import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import bcrypt from "bcrypt";

export async function login({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { error: "Invalid credentials" };

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return { error: "Invalid credentials" };

    return { success: true, userId: user.id };
}

const adSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(3),
    price: z.number().positive(),
    tags: z.array(z.string()).optional(),
});

export async function createAd(
    data: { title: string; description: string; price: number; tags?: string[] },
    userId: string
    ) {
    const parse = adSchema.safeParse(data);
    if (!parse.success) return { error: "Invalid ad data" };

    await prisma.ad.create({
        data: {
        ...parse.data,
        userId,
        },
    });

    revalidatePath("/");
    return { success: true };
}