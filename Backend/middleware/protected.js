import { verifyToken } from "../utils/jwt.js";
export const protect = (req, res, next) => {
    let token ;
    if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  req.user = decoded; // attach user info
  console.log("Protected middleware accessed by user:", req.user);
  next();
}
