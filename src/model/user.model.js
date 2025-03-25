import mongoose, { SchemaType } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type:mongoose.SchemaTypes.String,
        required:true
    },
    email:{
        type:mongoose.SchemaTypes.String,
        required:true,
        unique:true
    },
    password:{
        type:mongoose.SchemaTypes.String,
        required:true,
        unique:true
    },
},{
    collection:"users",
    timestamps:true,
    versionKey:false
})

export default mongoose.model("User",userSchema)