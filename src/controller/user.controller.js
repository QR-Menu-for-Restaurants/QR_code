import { hash } from "bcrypt";
import { compare } from "bcrypt";
import { isValidObjectId } from "mongoose";
import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
import {ACCESS_TOKEN_SECRET,ACCESS_TOKEN_EXPIRE_TIME,REFRESH_TOKEN_SECRET,REFRESH_TOKEN_EXPIRE_TIME} from "../config/jwt.config.js";

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

        const accessToken = jwt.sign(
            { id: user.id, role: user.role },
            ACCESS_TOKEN_SECRET,
            { expiresIn: ACCESS_TOKEN_EXPIRE_TIME, algorithm: "HS256" }
        );
        
        const refreshToken = jwt.sign(
            { id: user.id, role: user.role },
            REFRESH_TOKEN_SECRET,
            { expiresIn: REFRESH_TOKEN_EXPIRE_TIME, algorithm: "HS256" }
        );
        
        user.tokens={
            accessToken,
            refreshToken,
        };
    
        
        await user.save();

        response.redirect('/register')
        // response.status(201).send({
        //     message: "user created successfully",
        //     user
        // });

    } catch (error) {
        response.status(500).send({
            message: "Error on registering user",
            error: error.message
        });
    }
};

 const refreshUser = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            throw new BaseException("Refresh token is required", 400);
        }

        const data = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

        const newAccessToken = jwt.sign(
            { id: data.id, role: data.role },
            ACCESS_TOKEN_SECRET,
            { expiresIn: ACCESS_TOKEN_EXPIRE_TIME, algorithm: "HS256" }
        );

        const newRefreshToken = jwt.sign(
            { id: data.id, role: data.role },
            REFRESH_TOKEN_SECRET,
            { expiresIn: REFRESH_TOKEN_EXPIRE_TIME, algorithm: "HS256" }
        );

        res.status(200).send({
            message: "Access token refreshed successfully",
            accessToken: newAccessToken,
            refreshToken: newRefreshToken, 
        });
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            next(new BaseException("Refresh token expired", 422));
        } else if (error instanceof jwt.JsonWebTokenError) {
            next(new BaseException("Invalid refresh token", 401));
        } else {
            next(error);
        }
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

        response.redirect("/admin")

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
export default {registerUser,loginUser,getAllUsers,createUser,updateUser,deleteUser,refreshUser}