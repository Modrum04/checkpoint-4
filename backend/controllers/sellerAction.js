const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
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

createAccount = (req, res, next) => {
  const hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 19 * 2 ** 10,
    timeCost: 2,
    parallelism: 1,
  };

  argon2.hash(req.body.password, hashingOptions).then((hash) => {
    const seller = new Seller({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hash,
      isAdmin: false,
    });
    seller
      .save()
      .then(() => res.status(201).json({ message: "Compte vendeur crée" }))
      .catch((error) => res.status(500).json({ error }));
  });
};

login = (req, res, next) => {
  Seller.findOne({ email: req.body.email })
    .then((seller) => {
      if (seller === null) {
        res.status(401).json({ message: "Paire identifiant/mot de passe invalide" });
      } else {
        argon2
          .verify(seller.password, req.body.password)
          .then((isValid) =>
            !isValid
              ? res.status(401).json({ message: "Paire identifiant/mot de passe invalide" })
              : res.status(200).json({
                  sellerId: seller._id,
                  sellerName: seller.name,
                  isAdmin: seller.isAdmin,
                  token: jwt.sign(
                    { sellerId: seller._id, isAdmin: seller.isAdmin },
                    process.env.APP_SECRET,
                    {
                      expiresIn: "24h",
                    },
                  ),
                }),
          )
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

module.exports = { getOneSeller, getAllSellers, createAccount, login };
