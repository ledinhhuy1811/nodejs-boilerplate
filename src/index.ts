import express from "express";
import http from "http";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookiePaser from "cookie-parser";

import "./services/prisma";

import env from "./configs/env";
import morgan from "./configs/morgan";
import errorHandler from "./utils/error";
import appRoutes from "./routes";
import logger from "./configs/logger";
import { exitHandler, unexpectedErrorHandler } from "./utils/system";
import { connectCosmosClient } from "./services/cosmosClient";
import { connectDb } from "./services/prisma";

const app = express();
const server = http.createServer(app);

// use morgan to log request
app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// set security http header
app.use(helmet());

// set cors
app.use(
  cors({
    origin: "*",
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// helper to serialize bigint
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

// gzip compression
app.use(compression());

// parse cookie
app.use(cookiePaser());

// check health
app.get("/health", (_, res) => {
  res.json({
    status: "ok",
  });
});

// routes heres
app.use("/v1", appRoutes);

// error handler
app.use(errorHandler);

const PORT = env.port;

// listen app
server.listen(PORT, async () => {
  logger.info(`Server is running on port ${PORT}`);

  // connect to cosmos client
  await connectCosmosClient();

  // connect to database
  await connectDb();

  // Handle process events
  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);
  process.on("SIGTERM", async () => {
    logger.info("SIGTERM received");

    await exitHandler(server);
  });
  process.on("SIGINT", async () => {
    logger.info("SIGINT received");

    await exitHandler(server);
  });
});
