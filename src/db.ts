import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';


// Load environment variables from .env file
dotenv.config();
console.log("Host:", process.env.DB_HOST);

// Construct the database URL dynamically from environment variables
const databaseUrl = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?schema=calendar`;

// Initialize Prisma client
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: databaseUrl,
        },
    },
});

// initialize database connection
async function initialize() {
    try {
        await prisma.$connect();
        console.log("Data Source has been initialized!");
    } catch (error) {
        console.error("Error during Data Source initialization:", error);
    } finally {
        console.log("Done initializing dbs")
    }
}

initialize();

export { prisma };
