const express = require("express");
const authMiddleware = require("../../../middlewares/authMiddleware");
const {
  createExpCtrl,
  fetchALLExpCtrl,
  fetchExpDetailsCtrl,
  updateExpCtrl,
  deleteExpCtrl,
} = require("../../controllers/expenses/expenseCtrl");

const expenseRoute = express.Router();
expenseRoute.post("/", authMiddleware, createExpCtrl);
expenseRoute.get("/", authMiddleware, fetchALLExpCtrl);
expenseRoute.get("/:id", authMiddleware, fetchExpDetailsCtrl);
expenseRoute.put("/:id", authMiddleware, updateExpCtrl);
expenseRoute.delete("/:id", authMiddleware, deleteExpCtrl);

module.exports = expenseRoute;
