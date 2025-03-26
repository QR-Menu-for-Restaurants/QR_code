import express from "express"
import userRouter from "./routes/user.route.js"
import categoryRoute from "./routes/category.route.js";
import foodRouter from "./routes/food.routes.js";
import path from "node:path"
import { fileURLToPath } from 'url';
import foodModel from "./model/food.model.js";
import adminRouter from "./routes/aminPanel.route.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname, "public")));


app.use("/api/users",userRouter)
app.use("/api/categories",categoryRoute);
app.use("/api/foods",foodRouter);
app.use("/",adminRouter)


export default app