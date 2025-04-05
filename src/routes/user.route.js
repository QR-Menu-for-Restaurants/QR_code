import { Router } from "express"
import userController from "../controller/user.controller.js"
import { ValidationMiddleware } from "../middleware/validation.middleware.js"
import { loginSchema, registerSchema } from "../Schema/user.schema.js"
import { ProtectedMiddleware } from "../middleware/protected.middleware.js"
import { RolesMiddleware } from "../middleware/roles.middleware.js"
import { ROLES } from "../constants/role.contant.js"

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
    .post('/register', ValidationMiddleware(registerSchema),RolesMiddleware(ROLES.ALL), userController.registerUser)
    .post('/login', ValidationMiddleware(loginSchema),RolesMiddleware(ROLES.ALL), userController.loginUser)
    .get("/all",ProtectedMiddleware(true),RolesMiddleware(ROLES.ADMIN,ROLES.OWNER),userController.getAllUsers)
    .post("/",ProtectedMiddleware(true),RolesMiddleware(ROLES.ADMIN,ROLES.OWNER),userController.createUser)
    .put("/:id",ProtectedMiddleware(false),userController.updateUser)
    .delete("/:id",ProtectedMiddleware(true),RolesMiddleware(ROLES.ADMIN,ROLES.OWNER),userController.deleteUser)

export default userRouter