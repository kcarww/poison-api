import express, { Request, Response } from 'express';
import { sequelize } from './db/conexao';   
import { registerUser } from './rotas/users/register-user';
const app = express();

app.use(express.json()); 


app.post('/users', registerUser);

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
