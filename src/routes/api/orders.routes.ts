import { Router } from "express";
import * as controllers from "../../controllers/orders.controllers";
import authentecationMiddleware from "../../middleware/authentication.middleware";

const routes = Router();

routes.route("/").post(authentecationMiddleware, controllers.create);
routes.route("/:id").get(authentecationMiddleware, controllers.getMany);

export default routes;
