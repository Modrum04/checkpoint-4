const express = require("express");

const router = express.Router();

const { getOneSeller, getAllSellers } = require("../../controllers/sellerAction");

router.get("/", getAllSellers);

router.get("/:id", getOneSeller);

module.exports = router;
