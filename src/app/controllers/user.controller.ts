import httpStatus from "http-status";

import tryCatchAsync from "../../utils/tryCatchAsync";
import userService from "../services/user.service";
import { AddUserRequest } from "../types";

const addUser = tryCatchAsync(async (req, res, _next) => {
  const { name, email, password } = req.body as AddUserRequest;

  const data = await userService.addUser(name, email, password);

  res.status(httpStatus.OK).json({
    message: "User added successfully!",
    data: data,
    success: true,
  });
});

export default {
  addUser,
};
