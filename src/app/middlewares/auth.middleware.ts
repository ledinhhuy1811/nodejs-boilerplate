import { RequestHandler } from "express";
import httpStatus from "http-status";

import HttpException from "../../utils/exception";
import env from "../../configs/env";

const verifyApiKey: RequestHandler = async (req, _res, next) => {
  const apiKey = req.headers["api-key"];
  if (!apiKey) {
    return next(new HttpException(httpStatus.UNAUTHORIZED, "Unauthorized"));
  }

  if (apiKey !== env.apiKey) {
    return next(
      new HttpException(httpStatus.UNAUTHORIZED, "API Key is invalid")
    );
  }

  next();
};

export default { verifyApiKey };
