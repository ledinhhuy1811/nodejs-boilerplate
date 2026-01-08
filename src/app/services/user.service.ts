import httpStatus from "http-status";

import HttpException from "../../utils/exception";
import { prisma } from "../../services/prisma";

const addUser = async (name: string, email: string, password: string) => {
  // validate params
  if (!name || !email || !password) {
    throw new HttpException(
      httpStatus.BAD_REQUEST,
      "Invalid params: name, email, password are required."
    );
  }

  // check if user already exists
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (user) {
    throw new HttpException(httpStatus.BAD_REQUEST, "User already exists.");
  }

  // store new user
  const newUser = await prisma.user.create({
    data: { name, email, password },
  });
  if (!newUser) {
    throw new HttpException(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to add user."
    );
  }

  return {
    user: newUser,
  };
};

export default { addUser };
