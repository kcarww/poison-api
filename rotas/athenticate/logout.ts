import { Request, Response } from "express";
import session from 'express-session';

export async function logout(req: Request, res: Response) {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            res.status(500).send('Não foi possível fazer logout');
        } else {
            res.clearCookie('sessioncookie');
            res.send('Logout realizado com sucesso');
            req.session.id = '0'
        }
    });
}