import { NextFunction } from "express";
import { IRes } from "../typings/IRoute";

function cors(req: Request, res: Response & IRes, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
}

module.exports = cors;
