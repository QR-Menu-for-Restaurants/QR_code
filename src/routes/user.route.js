import { Router } from "express"
import userController from "../controller/user.controller.js"
import { ValidationMiddleware } from "../middleware/validation.middleware.js"
import { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema } from "../Schema/user.schema.js"
import { ProtectedMiddleware } from "../middleware/protected.middleware.js"
import { RolesMiddleware } from "../middleware/roles.middleware.js"
import { ROLES } from "../constants/role.contant.js"

const userRouter = Router()

userRouter.use("/",(req,res) => {
    res.render("login");
})

userRouter.get("/register", (req, res) => {
    res.render("register", { errors: [], error: null, formData: {} });
});

userRouter.get("/login", (req, res) => {
    res.render("login", { errors: [], error: null, formData: {} });
});


userRouter
    .post('/register', ValidationMiddleware(registerSchema),RolesMiddleware(ROLES.ALL), userController.registerUser)
    .post('/login', ValidationMiddleware(loginSchema),RolesMiddleware(ROLES.ALL), userController.loginUser)
    .get("/all",ProtectedMiddleware(true),RolesMiddleware(ROLES.ADMIN,ROLES.OWNER),userController.getAllUsers)
    .post("/",ProtectedMiddleware(true),RolesMiddleware(ROLES.ADMIN,ROLES.OWNER),userController.createUser)
    .post("/forgot-password",ProtectedMiddleware(false),ValidationMiddleware(forgotPasswordSchema),RolesMiddleware(ROLES.ALL),userController.forgotPassword)
    .post("/reset-password",ProtectedMiddleware(false),ValidationMiddleware(resetPasswordSchema),RolesMiddleware(ROLES.ALL),userController.resetPassword)
    .put("/:id",ProtectedMiddleware(false),userController.updateUser)
    .delete("/:id",ProtectedMiddleware(true),RolesMiddleware(ROLES.ADMIN,ROLES.OWNER),userController.deleteUser)

export default userRouter