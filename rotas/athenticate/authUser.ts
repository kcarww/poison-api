import { User } from '../../model/usuario';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import session from 'express-session';


export async function authenticateUser(req: Request, res: Response) {
    const { login, senha } = req.body;

    try {
        const user = await User.findOne({
            where: { login }
        });

        if (user) {
            bcrypt.compare(senha, user.senha, (err, result) => {
                if (err) {
                    return res.status(401).json({ success: false, message: 'Ocorreu um erro ao verificar a senha!' });
                }
                if (result) {
                    return res.json({ success: true, message: 'Autenticado' });
                    req.session.id = user.id
                    req.session.save();
                }
                return res.status(401).json({ success: false, message: 'Nome de usuário ou senha incorretos!' });
            });
        } else {
            return res.status(401).json({ success: false, message: 'Nome de usuário não encontrado!' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro no servidor!', error: error.message });
    }
}

export function checkAuthentication(req: Request, res: Response, next) {
    console.log(`result === ${req.session.id}`)
    if (req.session.id != '0') {
        next();
    } else {
        res.status(403).send('Não autorizado');
    }
}