import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany();

    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
        });

        console.log(`Password hashed for user: ${user.email}`);
    }

    console.log("All passwords migrated to bcrypt.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });