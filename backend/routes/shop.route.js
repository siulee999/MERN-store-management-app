import express from "express";

import { getShops, createShop, editShop, deleteShop } from "../controllers/shop.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { validateShop } from "../middlewares/validateSchema.js";

const router = express.Router();

router.get("/", getShops);

router.post("/add", verifyJWT, validateShop, createShop);

router.put("/edit/:id", verifyJWT, validateShop, editShop);

router.delete("/del/:id",verifyJWT, deleteShop);

export default router;