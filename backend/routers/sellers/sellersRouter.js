const express = require("express");

const router = express.Router();

const {
  getOneSeller,
  getAllSellers,
  createAccount,
  login,
} = require("../../controllers/sellerAction");
const verifyToken = require("../../services/verifyToken.middleware");

router.get("/", getAllSellers);

router.get("/:id", verifyToken, getOneSeller);

router.post("/signup", createAccount);

router.post("/login", login);

module.exports = router;
