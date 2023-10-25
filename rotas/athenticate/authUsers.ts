import { Request, Response, NextFunction } from 'express';

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
    if (req.isAuthenticated()) { 
        return next();
    } else {
        res.status(401).send('Você precisa estar logado para acessar esta rota.');
    }
}