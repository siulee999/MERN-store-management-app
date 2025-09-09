import express from "express";

import { getQuestions, createQA, editQA, deleteQA } from "../controllers/question.controller.js"
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { validateQA } from "../middlewares/validateSchema.js";

const router = express.Router();

router.get("/", getQuestions);

router.post("/add", verifyJWT, validateQA, createQA);

router.put("/edit/:id", verifyJWT, validateQA, editQA);

router.delete("/del/:id", verifyJWT, deleteQA);

export default router;