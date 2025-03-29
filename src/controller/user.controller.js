import { hash } from "bcrypt";
import { compare } from "bcrypt";
import { isValidObjectId } from "mongoose";
import userModel from "../model/user.model.js";
import { BaseException } from "../exceptions/base.exception.js";

const registerUser = async (request, response,next) => {
    try {
        const { name, email, password } = request.body;

        if (!name || !email || !password) {
            throw new BaseException("Invalid username or email",404);
        }

        const foundedUser = await userModel.findOne({ email });
        if (foundedUser) {
            throw new BaseException("user already exists",409);
        }

        const hashedPassword = await hash(password, 10);

        const user = new userModel({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        response.redirect('/register')
        

    } catch (error) {
        next(error);
    }
};



const loginUser = async (request, response,next) => {
    try {
        const { email, password } = request.body;


        if (!email || !password) {
            throw new BaseException("Invalid email or password",400)
        }

        const user = await userModel.findOne({ email });


        if (!user) {
            throw new BaseException("user not found",404);
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
            throw new BaseException("password mismatch",401);
        }

        response.redirect("/admin")

    } catch (error) {
        next(error);
    }
};



const getAllUsers=async (req,res) => {
    try {
        const users=await userModel.find()
        res.status(200).send({
            message: "success",
            data: users
        })
    } catch (error) {
        res.status(500).send({
            message: "Error on get all users"
        })
    }
}
const createUser = async (req, res,next) => {
    try {
        const {name,email,password}=req.body
        if(!(name && email && password)){
            throw new BaseException("name , email and password are required!",400)
        }
        const foundUser=await userModel.findOne({email})
        if(foundUser){
            throw new BaseException("user already exists",409);
        }
        const user = new userModel({
            name,
            email,
            password
        })
        await user.save()
        res.status(201).send({
            message: "success",
            data: user
        })
    } catch (error) {
        next(error);
    }
}
const updateUser = async (req, res,next) => {
    try {
        const id=req.params.id
        if (!isValidObjectId(id)) {
            throw new BaseException("invalid id",400);
        }
        const {name,email,password}=req.body
        if(!(name && email && password)){
            throw new BaseException("email,password and name are not given",400);
        }
        
        const user = await userModel.findByIdAndUpdate(id,{
            name,
            email,
            password
        },
        { new: true, runValidators: true })
        return res.status(200).send({
            message: "success",
            data: user
        })
    } catch (error) {
        next(error);
    }
}
const deleteUser = async (req, res,next) => {
    try {
        const id=req.params.id
        if (!isValidObjectId(id)) {
            throw new BaseException("invalid id",400);
        }        
        await userModel.findByIdAndDelete(id)
        return res.status(204).send()
    } catch (error) {
        next(error);
    }
}
export default {registerUser,loginUser,getAllUsers,createUser,updateUser,deleteUser}