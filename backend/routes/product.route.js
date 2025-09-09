import express from "express";

import { getProducts, createProduct, editProduct, deleteProduct } from "../controllers/product.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js"
import { validateProduct } from "../middlewares/validateSchema.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/add", verifyJWT, validateProduct, createProduct);

router.put("/edit/:id", verifyJWT, validateProduct, editProduct);

router.delete("/del/:id", verifyJWT, deleteProduct);

export default router;