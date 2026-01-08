import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

import env from "../configs/env";
import logger from "../configs/logger";

export const adapter = new PrismaPg({ connectionString: env.databaseUrl });
export const prisma = new PrismaClient({ adapter });

export const connectDb = async () => {
  try {
    await prisma.$connect();

    logger.info("Connected to database!");
  } catch (error) {
    logger.error(`Error in connecting to database: ${error}`);

    process.exit(1);
  }
};

export const disconnectDb = async () => {
  try {
    await prisma.$disconnect();

    logger.info("Disconnected from database!");
  } catch (error) {
    logger.error(`Error in disconnecting from database: ${error}`);

    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  await disconnectDb();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await disconnectDb();
  process.exit(0);
});
