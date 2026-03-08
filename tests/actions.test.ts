import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { prisma } from "@/lib/prisma";
import { createAd } from "@/lib/actions";

vi.mock("next/cache", () => ({
    revalidatePath: vi.fn(),
}));

const TEST_USER_ID = "test-user-id";

beforeAll(async () => {
    await prisma.user.create({
        data: {
        id: TEST_USER_ID,
        name: "Test User",
        email: "test@example.com",
        password: "hashedpassword",
        },
    });
});

afterAll(async () => {
    await prisma.ad.deleteMany({ where: { userId: TEST_USER_ID } });
    await prisma.user.delete({ where: { id: TEST_USER_ID } });
    await prisma.$disconnect();
});

describe("createAd Server Action", () => {
    it("debe retornar error con datos inválidos", async () => {
        const result = await createAd(
        { title: "x", description: "", price: -5 },
        TEST_USER_ID
        );
        expect(result.error).toBeDefined();
    });

    it("debe retornar éxito con datos válidos", async () => {
        const result = await createAd(
        { title: "Móvil", description: "Teléfono nuevo", price: 100, tags: ["tecno", "nuevo"] },
        TEST_USER_ID
        );
        expect(result.success).toBe(true);
    });
});