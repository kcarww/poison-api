import { User } from '../../model/usuario';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

export async function authenticateUser(req: Request, res: Response) {
    const { login, senha } = req.body;

    try {
        const user = await User.findOne({
            where: { login }
        });

        if (user) {
            console.log(`Senha do usuário: ${user.senha}`); // Log seguro agora dentro do condicional

            bcrypt.compare(senha, user.senha, (err, result) => {
                if (err) {
                    return res.status(401).json({ success: false, message: 'Ocorreu um erro ao verificar a senha!' });
                }
                if (result) {
                    return res.json({ success: true, message: 'Autenticado' });
                }
                return res.status(401).json({ success: false, message: 'Nome de usuário ou senha incorretos!' });
            });
        } else {
            return res.status(401).json({ success: false, message: 'Nome de usuário não encontrado!' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro no servidor!', error: error.message });
        throw error; 
    }
}
