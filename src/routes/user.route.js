import {Router} from "express"
import userController from "../controller/user.controller.js"
import { ValidationMiddleware } from "../middleware/validation.middleware.js"
import { loginSchema, registerSchema } from "../Schema/user.schema.js"

const userRouter=Router()

userRouter
    .post('/register',ValidationMiddleware(registerSchema),userController.registerUser)
    .post('/login',ValidationMiddleware(loginSchema),userController.loginUser)
    .get("/",userController.getAllUsers)
    .post("/",userController.createUser)
    .put("/:id",userController.updateUser)
    .delete("/:id",userController.deleteUser)

export default userRouter