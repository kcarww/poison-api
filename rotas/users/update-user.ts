import { Request, Response } from "express";
import { User } from "../../model/usuario";

export async function updateUser(req: Request, res: Response) {
    const {id} = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.json({error: 'User not found'});
        }

        const updatedUser = await user.update(req.body);
        res.json(updatedUser);
    }
    catch (error) {
        if (error instanceof(Error))
        res.status(500).json({ error: error.message });
    }
}