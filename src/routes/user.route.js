import { Router } from "express"
import userController from "../controller/user.controller.js"
import { ValidationMiddleware } from "../middleware/validation.middleware.js"
import { loginSchema, registerSchema } from "../Schema/user.schema.js"

const userRouter = Router()

userRouter.get("/", (req, res) => {
    res.redirect("/register");
});

userRouter.get("/register", (req, res) => {
    res.render("register");
});

userRouter.get("/login", (req, res) => {
    res.render("login"); 
});


userRouter
    .post('/register', ValidationMiddleware(registerSchema), userController.registerUser)
    .post('/login', ValidationMiddleware(loginSchema), userController.loginUser)
    .get("/all", userController.getAllUsers)
    .post("/", userController.createUser)
    .put("/:id", userController.updateUser)
    .delete("/:id", userController.deleteUser)

export default userRouter