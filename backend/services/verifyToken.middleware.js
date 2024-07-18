const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    const decodedToken = jwt.verify(token, process.env.APP_SECRET);
    const { sellerId, isAdmin } = decodedToken;
    req.auth = {
      sellerId: sellerId,
      isAdmin: isAdmin,
    };
    console.log(req.auth);
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};

module.exports = verifyToken;
