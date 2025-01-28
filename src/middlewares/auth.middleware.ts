import { NextFunction, Request, Response } from "express";
import jwt, { decode, JwtPayload, Secret } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: number ;
    }
  }
}

export const userMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.token;

    if (!token) {
      res.json({
        message: "You are not Logged In | No Token",
      });
      return;
    }

    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET as Secret 
    );
    if (!decode) {
      res.json({
        message: "You are not Logged | Invalid Token!",
      });
      return;
    }
    
    req.userId = (decoded as JwtPayload).userId;
    

    next();
  } catch (error) {
    res.status(500).json({
        message:"something went wrong",
        error
    })
  }
};
