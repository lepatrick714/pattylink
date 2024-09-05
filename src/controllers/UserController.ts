import { Request, Response } from "express";
import UserService from '../services/UserService'; // Assume you have a service for user handling

export class UserController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const user = await UserService.register(username, password);
      res.status(201).json({ user });
    } catch (error) {
      res.status(500).json({ error: "Failed to register user" });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const token = await UserService.login(username, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ error: "Invalid credentials" });
    }
  }
}
