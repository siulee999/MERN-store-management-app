import mongoose from "mongoose";
import Question from "../models/question.model.js";
import { generateNewId } from "./utils.js";


export async function getQuestions(req, res) {
  try {
    let data;
    const { q } = req.query;

    if (q) {

      const queryConditions = [
        { q_id_name: { $regex: q, $options: "i" }},
        { q_question: { $regex: q, $options: "i" }},
        { q_keywords: { $regex: q, $options: "i" }}
      ];

      data = await Question.find({ $or: queryConditions });

    } else {
      data = await Question.find();
    }

    res.json(data);

  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

export async function createQA(req, res) {
  try {
    const newId = await generateNewId(Question, "q_id");
    const newQA = { ...req.body, q_id: newId, q_id_name: `Q${newId.toString()}` };

    const created = await Question.create(newQA);

    res.json(created);

  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

export async function editQA(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ message: "Invalid Id" });

    const updated = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updated) return res.status(404).json({ message: "QA not found" });

    res.json(updated);

  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

export async function deleteQA(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ message: "Invalid Id" });

    const deleted = await Question.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "QA not found" });

    res.json({ success: "QA deleted" });

  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}