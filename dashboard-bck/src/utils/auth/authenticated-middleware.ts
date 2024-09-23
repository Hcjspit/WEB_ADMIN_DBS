import { Request, Response, NextFunction } from "express";
import passport from "passport";
import * as jwt from "jsonwebtoken";
import { isBlacklisted } from "../black-listed-token";

export const isAuthenticated = passport.authenticate("jwt", { session: false });

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "b990058830640ef0899d33b9fc29ee3c831639fcad8c808da5715027319e9cb0";
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  console.log("authHeader:", authHeader);
  if (typeof authHeader === "string") {
    const token = authHeader && authHeader.split(" ")[1];
    console.log("token:", token);
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    } else {
      if (isBlacklisted(token)) {
        return res.status(403).json({ message: "Token is blacklisted" });
      } else {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Failed to authenticate token" });
          }
          req.body = (decoded as any).username;
          next();
        });
      }
    }
  } else {
    return res
      .status(400)
      .json({ message: "Authorization header not properly formatted" });
  }
}
