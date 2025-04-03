import { BaseException } from "../exceptions/base.exception.js";

export const RolesMiddleware = (...roles) => {
    return (req, res, next) => {
        const userRole = req.role;
        if (!req.role) {
            throw new BaseException("Role not provided", 401);
        }
        if (!roles.includes(userRole)) {
            throw new BaseException("Unauthorized access", 403);
        }
        next();
    }
}