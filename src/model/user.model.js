import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type:mongoose.SchemaTypes.String,
        required:true
    },
    email:{
        type:mongoose.SchemaTypes.String,
        required:true,
        unique:true,
        match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gim
    },
    password:{
        type:mongoose.SchemaTypes.String,
        required:true,
        unique:true
    },
    role: {
        type: mongoose.SchemaTypes.String,
        enum: ["admin", "user"],
        default: "user"
    },
    tokens: {
        accessToken: {
            type: mongoose.SchemaTypes.String,
        },
        refreshToken: {
            type: mongoose.SchemaTypes.String,
        },
    },
},{
    collection:"users",
    timestamps:true,
    versionKey:false
})

export default mongoose.model("User",userSchema)