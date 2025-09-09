import mongoose from "mongoose";
import Joi from "joi";

const userSchema = new mongoose.Schema({
  userId: String,
  username: String,
  password: String,
  refreshToken: String
})

const User = mongoose.model("User", userSchema); 

export const userValidationSchema = Joi.object({
    userId: Joi.string(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    refreshToken: Joi.string()
}).required();

export default User;
