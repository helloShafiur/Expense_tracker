const express = require("express");
const authMiddleware = require("../../../middlewares/authMiddleware");
const {
  createIncCtrl,
  fetchALLIncCtrl,
  fetchIncDetailsCtrl,
  updateIncCtrl,
  deleteIncCtrl,
} = require("../../controllers/income/incomeCtrl");

const incomeRoute = express.Router();

incomeRoute.post("/", authMiddleware, createIncCtrl);
incomeRoute.get("/", authMiddleware, fetchALLIncCtrl);
incomeRoute.get("/:id", authMiddleware, fetchIncDetailsCtrl);
incomeRoute.put("/:id", authMiddleware, updateIncCtrl);
incomeRoute.delete("/:id", authMiddleware, deleteIncCtrl);

module.exports = incomeRoute;
