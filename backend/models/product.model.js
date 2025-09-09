import mongoose from "mongoose";
import Joi from "joi";

const productSchema = new mongoose.Schema({
    productId: { type: Number },
    productIdName: { type: String },
    cate: { type: String },
    productName: { type: String },
    price: { type: Number, min: 0 },
    description: { type: String },
});

const Product = mongoose.model('Product', productSchema);

export const productValidationSchema = Joi.object({
    cate: Joi.string().required(),
    productName: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
}).required();

export default Product;