const express = require("express");

const router = express.Router();

const { getOneClient, getAllClients } = require("../../controllers/clientAction");
const verifyToken = require("../../services/verifyToken.middleware");

router.get("/", verifyToken, getAllClients);

router.get("/:id", verifyToken, getOneClient);

module.exports = router;
