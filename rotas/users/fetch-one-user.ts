import { Request, Response } from "express";
import { User } from "../../model/usuario";

export async function fetchOneUser(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        if (error instanceof(Error))
        res.status(500).json({ error: error.message });
    }
}