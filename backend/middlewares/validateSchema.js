import { userValidationSchema } from "../models/user.model.js";
import { productValidationSchema } from "../models/product.model.js";
import { shopValidationSchema } from "../models/shop.model.js";
import { questionValidationSchema } from "../models/question.model.js";


function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: `${error.details[0].message}`});
    next();
  }
}

export const validateUser = validateSchema(userValidationSchema);
export const validateProduct = validateSchema(productValidationSchema);
export const validateQA = validateSchema(questionValidationSchema);
export const validateShop = validateSchema(shopValidationSchema);