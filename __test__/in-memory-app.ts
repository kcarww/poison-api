import express, { Express, Request, Response } from 'express';

const app: Express = express();

let users: any[] = [];

app.use(express.json());

app.post('/users', (req: Request, res: Response) => {
    const user = req.body;
    users.push(user);
    res.status(201).json(user);
});


export default app;