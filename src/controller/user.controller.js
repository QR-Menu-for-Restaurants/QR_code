import { hash } from "bcrypt";
import { compare } from "bcrypt";
import { isValidObjectId } from "mongoose";
import userModel from "../model/user.model.js";
import { BaseException } from "../exceptions/base.exception.js";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  ACCES_TOKEN_EXPIRE_TIME,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRE_TIME,
} from "../config/jwt.config.js";
import { sendMail } from "../utils/mail.utils.js";
import { PORT } from "../config/app.config.js";

const registerUser = async (request, response, next) => {
  try {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      throw new BaseException("Invalid username or email", 404);
    }

    const foundedUser = await userModel.findOne({ email });
    if (foundedUser) {
      throw new BaseException("user already exists", 409);
    }

    const hashedPassword = await hash(password, 10);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const htmlContent = `
  <div style="max-width: 600px; margin: auto; padding: 30px; font-family: Arial, sans-serif; background: #f9f9f9; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
    <div style="text-align: center;">
      <h2 style="color: #333;">👋 Salom, ${name}!</h2>
      <p style="font-size: 16px; color: #555;">
        Siz bizning <strong>Restoran</strong> xizmatimizga muvaffaqiyatli ro'yxatdan o'tdingiz.
      </p>
    </div>

    <div style="margin: 30px 0;">
      <p style="font-size: 15px; color: #444;">
        Endi siz menyuni ko‘rib chiqish, buyurtma berish va ko‘plab imtiyozlarga ega bo‘lishingiz mumkin!
      </p>
    </div>

    <div style="text-align: center; margin-bottom: 30px;">
      <a href="http://localhost:${PORT}/menu" style="background-color: #4CAF50; color: white; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-size: 16px;">
        Menyuga o'tish
      </a>
    </div>

    <div style="font-size: 13px; color: #888; text-align: center;">
      <p>Agar bu email sizga bexosdan kelgan bo‘lsa, e’tiborsiz qoldiring.</p>
      <p>&copy; 2025 Restoran Loyihasi</p>
    </div>
  </div>
`;

    await sendMail({
      to: email,
      subject: "Welcome!",
      html: htmlContent,
    });

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCES_TOKEN_EXPIRE_TIME, algorithm: "HS256" }
    );

    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRE_TIME, algorithm: "HS256" }
    );

    user.tokens = {
      accessToken,
      refreshToken,
    };

    await user.save();

    response.redirect("/categories");
  } catch (error) {
    next(error);
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
      { expiresIn: ACCES_TOKEN_EXPIRE_TIME, algorithm: "HS256" }
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

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new BaseException("User not found", 404);
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new BaseException("Invalid password", 401);
    }

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCES_TOKEN_EXPIRE_TIME }
    );
    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRE_TIME }
    );

    res.redirect("/categories");
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send({
      message: "success",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error on get all users",
    });
  }
};
const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
      throw new BaseException("name , email and password are required!", 400);
    }
    const foundUser = await userModel.findOne({ email });
    if (foundUser) {
      throw new BaseException("user already exists", 409);
    }
    const user = new userModel({
      name,
      email,
      password,
    });
    await user.save();
    res.status(201).send({
      message: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      throw new BaseException("invalid id", 400);
    }
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
      throw new BaseException("email,password and name are not given", 400);
    }

    const user = await userModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password,
      },
      { new: true, runValidators: true }
    );
    return res.status(200).send({
      message: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      throw new BaseException("invalid id", 400);
    }
    await userModel.findByIdAndDelete(id);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
export default {
  registerUser,
  loginUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  refreshUser,
};
