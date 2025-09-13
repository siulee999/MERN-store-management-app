import mongoose from "mongoose";
import Shop from "../models/shop.model.js";
import { generateNewId, haversineDistance } from "./utils.js";

export async function getShops(req, res) {
  try {
    let data = [];
    const { q, lat, lon } = req.query;

    if (q) {
      const queryConditions = [
        { shopIdName: { $regex: q, $options: "i" }},
        { shopName: { $regex: q, $options: "i" }},
        { address: { $regex: q, $options: "i" }}
      ];
      
      data = await Shop.find({ $or: queryConditions }).sort({ shopId: -1});
      return res.json(data);
    } 

    if (lat && lon) {
      const coord1 = {
        lat: parseFloat(lat),
        lon: parseFloat(lon)
      }

      if (!coord1.lat || !coord1.lon) return res.status(400).json({ message: "Invalid lat. and lon." });

      const shops = await Shop.find().sort({ shopId: -1});
      const coord2 = {};
      const found = shops.filter(shop => {
        coord2.lat = shop.latitude;
        coord2.lon = shop.longitude;
        return haversineDistance(coord1, coord2) <= 2;
      });

      return res.json(found);

    }
    

    data = await Shop.find().sort({ shopId: -1});
    res.json(data);

  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

export async function createShop(req, res) {
  try {
    const newId = await generateNewId(Shop, "shopId");
    const newShop = { ...req.body, shopId: newId, shopIdName: `S${newId.toString()}` };

    const created = await Shop.create(newShop);
    res.json(created);

  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

export async function editShop(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ message: "Invalid Id" });

    const updated = await Shop.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updated) return res.status(404).json({ message: "Shop not found" });

    res.json(updated);

  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

export async function deleteShop(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ message: "Invalid Id" });

    const deleted = await Shop.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Shop not found" });

    res.json({ success: "Shop deleted" });

  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}
