import express from "express";

import userController from "../app/controllers/user.controller";
import authMiddleware from "../app/middlewares/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware.verifyApiKey, userController.addUser);

export default router;
