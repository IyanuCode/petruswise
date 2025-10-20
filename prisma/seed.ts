import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main(){
    const password = await bcrypt.hash("Admin@123", 10); //10 means the salt rounds for hashing
    await prisma.admin.upsert({//if a record with the email exists, update it; otherwise, create it
        where:{email: "admin@petruswise.com"},
        update:{},
        create:{
            name: "Super Admin",
            email: "admin@petruswise.com",
            password,
            role: "ADMIN",
        },
    });
}

main()
    .then(() => console.log("Admin user created/updated successfully"))
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());