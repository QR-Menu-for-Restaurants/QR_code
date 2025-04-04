import express from "express"
import userRouter from "./routes/user.route.js"
import categoryRoute from "./routes/category.route.js";
import foodRouter from "./routes/food.routes.js";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/users",userRouter)
app.use("/api/categories",categoryRoute);
app.use("/api/foods",foodRouter);

export default app