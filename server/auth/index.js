const jwt = require("jsonwebtoken");

module.exports = {
  isLoggedIn(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ error: "Unauthorized user" });

    jwt.verify(token, process.env.SECRET, (err, decode) => {
      if (err)
        return res.status(500).json({
          error: "Token is expired. Please login to continue.",
        });
      next();
    });
  },
};
