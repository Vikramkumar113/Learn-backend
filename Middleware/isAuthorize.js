import jwt from "jsonwebtoken";
import "dotenv/config";


export const authenticatedUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, msg: "You are not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    console.log(e.message);
    res.status(403).json({ success: false, msg: "Invalid or expired token" });
  }
};