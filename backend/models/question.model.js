import mongoose from "mongoose";
import Joi from "joi";

const questionSchema = new mongoose.Schema({
    q_id: Number,
    q_id_name: String,
    q_question: String,
    q_answer: String,
    q_keywords: String
});

const Question = mongoose.model("Question", questionSchema);

export const questionValidationSchema = Joi.object({
    q_question: Joi.string().required(),
    q_answer: Joi.string().required(),
    q_keywords: Joi.string().allow(""),
}).required();

export default Question;