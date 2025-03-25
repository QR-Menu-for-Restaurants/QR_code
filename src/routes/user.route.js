import {Router} from "express"
import userController from "../controller/user.controller.js"

const userRouter=Router()

userRouter
    .get("/",userController.getAllUsers)
    .post("/",userController.createUser)
    .put("/:id",userController.updateUser)
    .delete("/:id",userController.deleteUser)

export default userRouter