const express = require("express");

const router = express.Router();

const { getOneClient, getAllClients } = require("../../controllers/clientAction");

router.get("/", getAllClients);

router.get("/:id", getOneClient);

module.exports = router;
