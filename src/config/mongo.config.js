import { config } from "dotenv";
import mongoose from "mongoose";

config()

const connectDB=async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Databasega ulandi ✅");
    } catch (error) {
        console.log("Databasega ulshda xatolik❌");
        process.exit(1)
    }
}

export default connectDB;