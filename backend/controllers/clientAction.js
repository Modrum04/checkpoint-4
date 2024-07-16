const Client = require("../models/Client");

getOneClient = (req, res, next) => {
  Client.findOne({ _id: req.params.id })
    .then((client) => res.status(200).json(client))
    .catch((e) => res.status(400).json({ e }));
};

getAllClients = (req, res, next) => {
  Client.find()
    .then((clients) => res.status(200).json(clients))
    .catch((error) => res.status(400).json({ error }));
};

module.exports = { getOneClient, getAllClients };
