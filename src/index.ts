import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import Ratelimit from "express-rate-limit";
import errormiddleware from "./middleware/error.middleware";
import config from "./config";
import db from "./database";
import { Client } from "pg";

console.log(config);

const port = config.PORT || 3000;
const app: Application = express();

app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use(
  Ratelimit({
    windowMs: 60 * 60 * 1000, // 15 minutes
    max: 15, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "too many request",
  })
);
app.get("/", (req: Request, res: Response) => {
  throw new Error("error exist");
  res.json({
    message: "hello",
  });
});

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);

  res.json({
    message: "hello from post",
    data: req.body,
  });
});

db.connect().then((Client) => {
  return Client.query("SELECT NOW()")
    .then((res) => {
      Client.release();
      console.log(res.rows);
    })
    .catch((err) => {
      Client.release();
      console.log(err.stack);
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
