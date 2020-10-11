const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth");
    if (!token)
      return res
        .status(401).json({ error: 'no auth token' });
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
      return res
        .status(401);
    req.userid = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
