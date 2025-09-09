import jwt from "jsonwebtoken";

export function verifyJWT(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No access token"}); 

  const token = authHeader.split(" ")[1];
  
  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') return res.status(403).json({ message: "Token expires"});
      return res.status(401).json({ message: "Failed to verify" });
    }

    req.user = decoded;
    next();
  })
}