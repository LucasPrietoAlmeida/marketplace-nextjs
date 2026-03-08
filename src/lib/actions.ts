"use server";

import { prisma } from "./prisma";
import bcrypt from "bcrypt";

export async function login({
    email,
    password,
    }: {
    email: string;
    password: string;
    }
) {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return { error: "Invalid credentials" };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return { error: "Invalid credentials" };
    }

    return { success: true };
}