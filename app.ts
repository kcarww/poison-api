import express, { Request, Response } from 'express';
import { sequelize } from './db/conexao';
import { registerUser } from './rotas/users/register-user';
import { fetchAllUsers } from './rotas/users/fetch-user';
import { fetchOneUser } from './rotas/users/fetch-one-user';
import { updateUser } from './rotas/users/update-user';
import { deleteUser } from './rotas/users/delete-user';
import { authenticateUser } from './rotas/athenticate/authUser';

const app = express();

app.use(express.json()); 


app.post('/login', authenticateUser)

app.post('/users', registerUser);
app.get('/users', fetchAllUsers);
app.get('/users/:id', fetchOneUser)
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);


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


