import { Request, Response } from "express";
import { User } from "../../model/usuario";

export async function fetchAllUsers(req: Request, res: Response) {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        if (error instanceof(Error))
        res.status(500).json({ error: error.message });
    }
}