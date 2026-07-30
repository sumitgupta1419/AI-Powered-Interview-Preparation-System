const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    console.log("==================================");
    console.log("Authorization Header:");
    console.log(req.headers.authorization);
    console.log("==================================");

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log("Extracted Token:");
    console.log(token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    console.log("✅ JWT VERIFIED");
    console.log(req.user);

    // ✅ ONLY ONE next()
    return next();

  } catch (err) {
    console.log("JWT ERROR:");
    console.log(err.message);

    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { protect };