import { hash } from "bcrypt";
import { compare } from "bcrypt";
import { isValidObjectId } from "mongoose";
import userModel from "../model/user.model.js";

const registerUser = async (request, response) => {
    try {
        const { name, email, password } = request.body;

        if (!name || !email || !password) {
            return response.status(400).send({
                message: "name, email or password is not given"
            });
        }

        const foundedUser = await userModel.findOne({ email });
        if (foundedUser) {
            return response.status(409).send({
                message: "user already exists"
            });
        }

        const hashedPassword = await hash(password, 10);

        const user = new userModel({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        response.status(201).send({
            message: "user created successfully",
            user
        });

    } catch (error) {
        response.status(500).send({
            message: "Error on registering user",
            error: error.message
        });
    }
};



const loginUser = async (request, response) => {
    try {
        const { email, password } = request.body;


        if (!email || !password) {
            return response.status(400).json({
                message: "Email or password is not given"
            });
        }

        const user = await userModel.findOne({ email });


        if (!user) {
            return response.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
            return response.status(401).json({
                message: "Invalid email or password"
            });
        }

        return response.status(200).json({
            message: "Login successful",
            data: user
        });

    } catch (error) {
        console.error("Login error:", error);
        return response.status(500).json({
            message: "Error on login",
            error: error.message
        });
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
const createUser = async (req, res) => {
    try {
        const {name,email,password}=req.body
        if(!(name && email && password)){
            return res.status(400).send({
                message:"name,email or password is not given"
            })
        }
        const foundUser=await userModel.findOne({email})
        if(foundUser){
            return res.status(409).send({
                message:"user is already have"
            })
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
        res.status(500).send({
            message: "Error on create category"
        })
    }
}
const updateUser = async (req, res) => {
    try {
        const id=req.params.id
        if (!isValidObjectId(id)) {
            res.status(400).send({
                message: "id not true given"
            })
        }
        const {name,email,password}=req.body
        if(!(name && email && password)){
            return res.status(400).send({
                message:"name,email or password is not given"
            })
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
        console.log(error);
        
        res.status(500).send({
            message: "Error on create category"
        })
    }
}
const deleteUser = async (req, res) => {
    try {
        const id=req.params.id
        if (!isValidObjectId(id)) {
            res.status(400).send({
                message: "id not true given"
            })
        }        
        await userModel.findByIdAndDelete(id)
        return res.status(204).send()
    } catch (error) {
        console.log(error);
        
        res.status(500).send({
            message: "Error on create category"
        })
    }
}
export default {registerUser,loginUser,getAllUsers,createUser,updateUser,deleteUser}