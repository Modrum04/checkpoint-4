const express = require("express");

const router = express.Router();
const sort = require("../../services/formatQuery.middleware");
const {
  getAllReports,
  getOneReport,
  deleteOneReport,
  modifyOneReport,
} = require("../../controllers/reportAction");

router.get("/", sort, getAllReports);

router.get("/:id", getOneReport);

router.post("/", createReport);

router.put("/:id", modifyOneReport);

router.delete("/:id", deleteOneReport);

module.exports = router;
