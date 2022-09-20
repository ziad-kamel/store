import { Router } from "express";
import * as controllers from "../../controllers/users.controllers";
import authentecationMiddleware from "../../middleware/authentication.middleware";

const routes = Router();
routes
  .route("/")
  .get(authentecationMiddleware, controllers.GetUsers)
  .post(controllers.CreateUser);
routes
  .route("/:id")
  .get(authentecationMiddleware, controllers.GetOneUser)
  .patch(controllers.UpdateUser)
  .delete(controllers.DeleteUser);

routes.route("/authenticate").post(controllers.AuthenticateUser);

export default routes;
