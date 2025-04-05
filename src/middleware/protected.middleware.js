import { ACCESS_TOKEN_SECRET } from "../config/jwt.config.js";
import { BaseException } from "../exceptions/base.exception.js";
import jwt from "jsonwebtoken";

export const ProtectedMiddleware = (isProtected) => {
  return (request, _, next) => {
    if (!isProtected) {
      request.role = "user";
      return next();
    }
    const token = request.cookies["accessToken"];  

    if (!token) {
      throw new BaseException("No token provided", 401);
    }

    try {
      const decodedData = jwt.verify(token, ACCESS_TOKEN_SECRET);
      request.user = decodedData.user;
      request.role = decodedData.role;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return next(new BaseException("Token expired", 401));
      } else if (error instanceof jwt.JsonWebTokenError) {
        return next(new BaseException("Invalid token", 401));
      } else if (error instanceof jwt.NotBeforeError) {
        return next(new BaseException("Token not valid before expiration", 401));
      } else {
        next(error);
      }
    }
  };
};
