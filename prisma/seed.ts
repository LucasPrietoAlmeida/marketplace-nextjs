import { prisma } from "@/lib/prisma";

async function main() {
    await prisma.user.create({
        data: {
        email: "lucas@test.com",
        password: "123456",
        name: "Lucas",
        ads: {
            create: [
            {
                title: "Camiseta Nike",
                description: "Camiseta deportiva nueva",
                price: 25.99,
                tags: ["ropa", "deporte"],
            },
            {
                title: "Auriculares Bluetooth",
                description: "Auriculares inalámbricos",
                price: 49.99,
                tags: ["audio", "tecnología"],
            },
            {
                title: "Libro JavaScript",
                description: "Aprende JS desde cero",
                price: 15.5,
                tags: ["libro", "programación"],
            },
            ],
        },
        },
    });

    console.log("Seed ejecutado correctamente");
    }

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });