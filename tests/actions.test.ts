import "dotenv/config";
import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { prisma } from "@/lib/prisma";
import { createAd } from "@/lib/actions";

console.log("DB URL:", process.env.DATABASE_URL);

vi.mock("next/cache", () => ({
    revalidatePath: vi.fn(),
}));

let TEST_USER_ID: string;

beforeAll(async () => {
    const user = await prisma.user.create({
        data: {
        name: "Test User",
        email: `test-${Date.now()}@example.com`,
        password: "hashedpassword",
        },
    });

    TEST_USER_ID = user.id;
});

afterAll(async () => {
    if (TEST_USER_ID) {
        await prisma.ad.deleteMany({
        where: { userId: TEST_USER_ID },
        });

        await prisma.user.delete({
        where: { id: TEST_USER_ID },
        });
    }

    await prisma.$disconnect();
});

describe("createAd Server Action", () => {
    it("debe retornar error con datos inválidos", async () => {
        const result = await createAd(
        {
            title: "x",
            description: "",
            price: -5,
        },
        TEST_USER_ID
        );

        expect(result.error).toBeDefined();
    });

    it("debe retornar éxito con datos válidos", async () => {
        const result = await createAd(
        {
            title: "Móvil",
            description: "Teléfono nuevo",
            price: 100,
            tags: ["tecno", "nuevo"],
        },
        TEST_USER_ID
        );

        expect(result.success).toBe(true);
    });
});