const express = require("express");

const router = express.Router();
const formatForSortAndFilter = require("../../services/formatQuery.middleware");
const {
  getAllReports,
  getOneReport,
  deleteOneReport,
  modifyOneReport,
} = require("../../controllers/reportAction");
const verifyToken = require("../../services/verifyToken.middleware");

router.get("/", verifyToken, formatForSortAndFilter, getAllReports);

router.get("/:id", verifyToken, getOneReport);

router.post("/", verifyToken, createReport);

router.put("/:id", verifyToken, modifyOneReport);

router.delete("/:id", verifyToken, deleteOneReport);

module.exports = router;
