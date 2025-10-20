//1.
//Next js hotreloads so many times that it creates multiple instances of PrismaClient in development mode.
//This can lead to exhausting your database connections.
//We prevent that from happening with this code.
import {PrismaClient} from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient
};


export const prisma = globalForPrisma.prisma || new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;