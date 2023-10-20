import express, { Request, Response } from 'express';
import { sequelize } from './db/conexao';
import { User } from './model/usuario';      
const app = express();

app.use(express.json()); 


app.post('/users', async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');

    sequelize.sync({ alter: true })  
        .then(() => {
            console.log('Database synced');
        })
        .catch(error => {
            console.error('Error syncing database:', error);
        });
});

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});
