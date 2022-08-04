import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
//! to log queries use below code
// const prisma = new PrismaClient({ log: ["query"] });

async function main() {
    //we're deleting so we don't get unique email error
    await prisma.user.deleteMany()
    const user = await prisma.user.create({
        data: {
            name: "Ali",
            email: "ali@gmail.com",
            age: 27,
            userPreference: {
                create: {
                    emailUpdates: true
                }
            }
        },
        select: {
            name: true,
            userPreference: { select: { id: true } }
        }
    })
    console.log(user);
}

main().catch(e => {
    console.log(e.message);
})
    .finally(async () => {
        await prisma.$disconnect();
    })