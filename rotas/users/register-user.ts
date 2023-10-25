import { Request, Response } from "express";
import { User } from "../../model/usuario";
import bcrypt from 'bcrypt';


export async function registerUser (req: Request, res: Response) {
    try {
        const {login, senha, categoria} = req.body;
        const hash_password = await bcrypt.hash(senha, 10);
        const user = await User.create({login, senha: hash_password, categoria});
        res.json(user);
    } catch (error) {
        if (error instanceof(Error))
        res.status(500).json({ error: error.message });
    }
}