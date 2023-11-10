import express, { Request, Response } from 'express';
import { sequelize } from './db/conexao';
import { registerUser } from './rotas/users/register-user';
import { fetchAllUsers } from './rotas/users/fetch-user';
import { fetchOneUser } from './rotas/users/fetch-one-user';
import { updateUser } from './rotas/users/update-user';
import { deleteUser } from './rotas/users/delete-user';
import { authenticateUser, checkAuthentication } from './rotas/athenticate/authUser';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import { logout } from './rotas/athenticate/logout';
import { registerProduct } from './rotas/products/register-product';
import { fetchAllProducts } from './rotas/products/fetch-product';
import { fetchOneProduct } from './rotas/products/fetch-one-product';
import { updateProduct } from './rotas/products/update-product';
import { deleteProduct } from './rotas/products/delete-product';


const app = express();

const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'poison'
}
const MySQLStoreFactory = MySQLStore(session);

const sessionStore = new MySQLStoreFactory(options);


app.use(session({
    name: 'sessioncookie',
    secret: '123',
    store: sessionStore,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } 
}));

app.use(express.json()); 


app.post('/login', authenticateUser)
app.get('/logout', logout)

// user routes
app.post('/users', checkAuthentication ,registerUser);
app.get('/users', checkAuthentication ,fetchAllUsers);
app.get('/users/:id', checkAuthentication ,fetchOneUser)
app.put('/users/:id', checkAuthentication ,updateUser);
app.delete('/users/:id', checkAuthentication ,deleteUser);

// product routes
app.post('/product', checkAuthentication ,registerProduct);
app.get('/product', checkAuthentication ,fetchAllProducts);
app.get('/product/:id', checkAuthentication ,fetchOneProduct)
app.put('/product/:id', checkAuthentication ,updateProduct);
app.delete('/product/:id', checkAuthentication ,deleteProduct);


app.listen(3000, () => {
    console.log('Server is running on port 3000');

    sequelize.sync({ alter: true, force: true })  
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


