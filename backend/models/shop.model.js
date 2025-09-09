import mongoose from 'mongoose';
import Joi from "joi";

const shopSchema = new mongoose.Schema({
  shopId: { type: Number },
  shopIdName: { type: String },
  shopName: { type: String },
  address: { type: String },
  openingHour: { type: String },
  latitude: { type: Number },
  longitude: { type: Number }
});

const Shop = mongoose.model('Shop', shopSchema);

export const shopValidationSchema = Joi.object({
  shopName: Joi.string().required(),
  address: Joi.string().required(),
  openingHour: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required()
}).required();

export default Shop;



