import express, { Request, Response } from 'express';
import { sequelize } from './db/conexao';   
import { registerUser } from './rotas/users/register-user';
import { fetchAllUsers } from './rotas/users/fetch-user';
import { fetchOneUser } from './rotas/users/fetch-one-user';
import { updateUser } from './rotas/users/update-user';
import { deleteUser } from './rotas/users/delete-user';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { User } from './model/usuario';

const app = express();

app.use(express.json()); 
app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ where: { login: username } });

            if (!user) {
                return done(null, false, { message: 'Usuário não encontrado.' });
            }

            const isMatch = await bcrypt.compare(password, user.senha);


            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Senha incorreta.' });
            }

        } catch (error) {
            done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // Busque o usuário pelo ID no banco de dados e retorne-o
    // ...
});

// Rotas
app.post('/login', passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/login'
}));

// app.get('/logout', (req: Request, res: Response) => {
//     req.logout();
//     res.redirect('/');
// });


app.post('/users', ensureAuthenticated, registerUser);
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

function ensureAuthenticated(req: Request, res: Response, next: Function) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
}