import mongoose from "mongoose";
import Product from "../models/product.model.js";
import { generateNewId } from "./utils.js";


export async function getProducts(req, res) {
  try {
    let data;
    const { q, lp, hp } = req.query;

    if (q) {
      const queryConditions = [
        { productIdName: { $regex: q, $options: "i"} },
        { productName: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } }
      ];

      // check lp & hp 
      const lowerPrice = parseFloat(lp);
      const higherPrice = parseFloat(hp);

      if (lowerPrice && higherPrice) {
        data = await Product.find({ $and: [
          { $or: queryConditions },
          { price: { $gte: lowerPrice, $lte: higherPrice}}
        ]}).sort({ productId: -1});

      } else {
        data = await Product.find({ $or: queryConditions }).sort({ productId: -1});
      }
      
    } else {
      data = await Product.find().sort({ productId: -1});
    }

    res.json(data);

  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

export async function createProduct(req, res) {
  try {
    const newId = await generateNewId(Product, "productId");
    const newProduct = {...req.body, productId: newId, productIdName: newId.toString()};

    const created = await Product.create(newProduct);
    res.json(created);

  } catch(err) {
    res.sendStatus(500);
    console.log(err);
  }
}

export async function editProduct(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ message: "Invalid Id"});

    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updated) return res.status(404).json({ message: "Product not found"})
    
    res.json(updated);

  } catch(err) {
    res.sendStatus(500);
    console.log(err);
  }
}

export async function deleteProduct(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ message: "Invalid Id"});
    
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Product not found"})

    res.json({ success: "Product deleted"});

  } catch(err) {
    res.sendStatus(500);
    console.log(err);
  }
}