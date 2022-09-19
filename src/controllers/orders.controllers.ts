import { NextFunction, Request, Response } from "express";
import OrderModel from "../models/order.model";

const orderModel = new OrderModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderModel.create(req.body);
    res.json({
      status: "success",
      data: { ...order },
      message: "order created succesfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await orderModel.getMany(req.params.id as unknown as string);
    res.json({
      status: "success",
      data: {
        order_id: orders[0],
        by: orders[1],
        products: orders[2],
        quanitty: orders[3],
      },
      message: "orders retrived successfully",
    });
  } catch (error) {
    next(error);
  }
};
