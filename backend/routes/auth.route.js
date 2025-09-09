import express from "express";

import { handleLogin, handleLogout, handleRefreshToken } from "../controllers/auth.controller.js";
import { validateUser } from "../middlewares/validateSchema.js";

const router = express.Router();

router.post("/login", validateUser, handleLogin); 

router.post("/refresh", handleRefreshToken); 

router.post("/logout", handleLogout); 

export default router;