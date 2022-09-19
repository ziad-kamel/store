import { Router } from "express";
import * as controllers from "../../controllers/products.controllers";
import authentecationMiddleware from "../../middleware/authentication.middleware";

const route = Router();
route.route("/Index/").get(controllers.getMany);
route.route("/Show/:id").get(controllers.getOne);
route.route("/Create/").post(authentecationMiddleware, controllers.create);
export default route;
