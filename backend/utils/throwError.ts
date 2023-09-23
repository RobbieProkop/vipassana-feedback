import { Request, Response } from "express";

const throwError = (res: Response, status: number, message: string) => {
  res.status(status);
  throw new Error(message);
};

export default throwError;
