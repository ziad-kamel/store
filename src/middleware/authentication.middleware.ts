import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import configuration from "../configuration";
import Error from "../interface/error.interface";

const handelError = (next: NextFunction) => {
  const error: Error = new Error(
    "an error ocured while login kindly try again"
  );
  error.status = 401;
  next(error);
};

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authenticateHeader = req.get("Authorization");
    if (authenticateHeader) {
      const token = authenticateHeader.split(" ")[1];
      const Bearer = authenticateHeader.split(" ")[0].toLowerCase();
      if (!(token && Bearer == "bearer")) {
        handelError(next);
      } else {
        const decodeToken = jwt.verify(
          token,
          configuration.token as unknown as string
        );
        if (!decodeToken) {
          handelError(next);
        } else {
          next();
        }
      }
    } else {
      handelError(next);
    }
  } catch (error) {
    handelError(next);
  }
};
export default validateToken;
