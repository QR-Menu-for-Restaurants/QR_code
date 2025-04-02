import express from "express"
import path from "node:path"
import { fileURLToPath } from 'url';
import adminRouter from "./routes/aminPanel.route.js";
import router from "./routes/index.js"
import userRouter from "./routes/user.route.js";
import qrRouter from "./routes/qrcode.route.js";
import menuRouter from "./routes/menu.route.js";
import { ErrorHandlerMiddleware } from "./middleware/error.handler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")));

app.use("/", qrRouter);
app.use("/",router)
app.use("/", adminRouter)
app.use("/",userRouter)
app.use("/",menuRouter);
app.use(ErrorHandlerMiddleware);

export default app
