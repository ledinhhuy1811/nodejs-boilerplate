import express from "express";

import docsRoutes from "./docs";
import userRoutes from "./user";

const router = express.Router();

const defaultRoutes: Array<{
  path: string;
  route: express.Router;
}> = [
  {
    path: "/docs",
    route: docsRoutes,
  },
  {
    path: "/user",
    route: userRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
