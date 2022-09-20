import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import Ratelimit from "express-rate-limit";
import errormiddleware from "./middleware/error.middleware";
import configuration from "./configuration";
import routes from "./routes";

const port = configuration.port || 3000;
const app: Application = express();

app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use(
  Ratelimit({
    windowMs: 60 * 60 * 1000, // 15 minutes
    max: 200, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "too many request",
  })
);

app.use("/api", routes);
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "hello",
  });
});

app.use(errormiddleware);
app.use((_req: Request, _res: Response) => {
  _res.status(404).json({
    message: "you are lost",
  });
});
app.listen(port, () => {
  console.log(`server run at port ${port}`);
});

export default app;
