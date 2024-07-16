const Seller = require("../models/Seller");

getOneSeller = (req, res, next) => {
  Seller.findOne({ _id: req.params.id })
    .then((seller) => res.status(200).json(seller))
    .catch((e) => res.status(400).json({ e }));
};

getAllSellers = (req, res, next) => {
  Seller.find()
    .then((sellers) => res.status(200).json(sellers))
    .catch((error) => res.status(400).json({ error }));
};

module.exports = { getOneSeller, getAllSellers };
