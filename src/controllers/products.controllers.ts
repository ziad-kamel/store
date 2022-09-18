import { NextFunction, Request, Response } from "express";
import ProductModel from "../models/product.model";
import jwt from "jsonwebtoken";
import config from "../config";

const productModel = new ProductModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productModel.create(req.body);
    const token = jwt.sign(
      { product },
      config.tokenSecret as unknown as string
    );
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "the product not found",
      });
    }
    return res.json({
      status: "success",
      data: { ...product, token },
      message: "product created succesfully",
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
    const products = await productModel.getMany();
    res.json({
      status: "success",
      data: { ...products },
      message: "products retrived successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productModel.getOne(
      req.params.id as unknown as string
    );
    res.json({
      status: "success",
      data: { ...product },
      message: "product retrived succesfully",
    });
  } catch (error) {
    next(error);
  }
};
