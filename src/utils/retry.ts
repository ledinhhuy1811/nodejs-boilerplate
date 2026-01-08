import logger from "../configs/logger";

const MAX_RETRY = 3;

export const retryFunction = async (fn: () => Promise<any>) => {
  let error: any;

  for (let i = 0; i < MAX_RETRY; i++) {
    try {
      await fn();

      return null;
    } catch (err) {
      error = err;
      logger.error(`Error retry: ${err}`);

      // sleep for 2s before next retry
      await new Promise((resolve) => setTimeout(resolve, 2_000));
    }
  }

  return error;
};
