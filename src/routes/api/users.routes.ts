import { Router } from "express";
import * as controllers from "../../controllers/users.controllers";
import authentecationMiddleware from "../../middleware/authentication.middleware";

const routes = Router();
routes
  .route("/")
  .get(authentecationMiddleware, controllers.getMany)
  .post(controllers.create);
routes
  .route("/:id")
  .get(authentecationMiddleware, controllers.getOne)
  .patch(controllers.updateOne)
  .delete(controllers.deleteOne);

routes.route("/authenticate").post(controllers.authenticate);

export default routes;
