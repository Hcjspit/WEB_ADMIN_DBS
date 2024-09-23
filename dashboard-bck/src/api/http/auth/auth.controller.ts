import { Request, Response, NextFunction } from "express";
import { generateToken, getUser } from "./auth.service";
import { TypedRequest } from "../../../utils/typed-request";
import { LoginDTO } from "./auth.dto";

export const handleLogin = async (
  req: TypedRequest<LoginDTO>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await getUser(email, password);
    if (user) {
      const token = generateToken(user);
      res.json({ ...user, token });
    } else {
      res.status(401).json({ error: "Email or password is incorrect" });
    }
  } catch (error) {
    console.error("Login error: ", error);
    next(error);
  }
};

export const handleLogout = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ message: "Logout succesful" });
};
