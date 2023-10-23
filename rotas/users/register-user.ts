import { Request, Response } from "express";
import { User } from "../../model/usuario";

export async function registerUser (req: Request, res: Response) {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        if (error instanceof(Error))
        res.status(500).json({ error: error.message });
    }
}