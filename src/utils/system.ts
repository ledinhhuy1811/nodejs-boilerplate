import { Server } from "http";

import logger from "../configs/logger";

// Graceful shutdown
export const exitHandler = async (server: Server): Promise<void> => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
    });

    process.exit(1);
  }
};

export const unexpectedErrorHandler = (server: Server, error: Error): void => {
  logger.error("Unexpected error: ", error);

  exitHandler(server);
};
