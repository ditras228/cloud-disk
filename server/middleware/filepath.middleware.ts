import { NextFunction } from "express";

function filePath(path: any) {
  return function (req: Request & IReq, res: Response, next: NextFunction) {
    req.filePath = path;
    next();
  };
}

module.exports = filePath;

interface IReq {
  filePath: string;
}
