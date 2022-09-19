import { Router } from "express";
import * as controllers from "../../controllers/products.controllers";
import authentecationMiddleware from "../../middleware/authentication.middleware";

const route = Router();
route
  .route("/")
  .get(controllers.getMany)
  .post(authentecationMiddleware, controllers.create);
route.route("/:id").get(controllers.getOne);
export default route;
