import express, { Express, Request, Response } from 'express';

const app: Express = express();

let users: any[] = [];

app.use(express.json());

app.post('/users', (req: Request, res: Response) => {
    const user = req.body;
    users.push(user);
    res.status(201).json(user);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

export default app;