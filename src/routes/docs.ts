import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

import { swaggerOptions } from "../configs/swagger";

const router = express.Router();

const swaggerDocs = swaggerJsDoc(swaggerOptions);

router.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default router;
