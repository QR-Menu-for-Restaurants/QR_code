import { config } from "dotenv";
import mongoose from "mongoose";

config()

const connectDB=async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB connected");
    } catch (error) {
        console.log("error on connect DB");
        process.exit(1)
    }
}

export default connectDB;