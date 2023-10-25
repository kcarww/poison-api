"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conexao_1 = require("./db/conexao");
const register_user_1 = require("./rotas/users/register-user");
const fetch_user_1 = require("./rotas/users/fetch-user");
const fetch_one_user_1 = require("./rotas/users/fetch-one-user");
const update_user_1 = require("./rotas/users/update-user");
const delete_user_1 = require("./rotas/users/delete-user");
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_1 = require("./model/usuario");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: '123',
    resave: false,
    saveUninitialized: false
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.use(new passport_local_1.Strategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield usuario_1.User.findOne({ where: { login: username } });
        if (!user) {
            return done(null, false, { message: 'Usuário não encontrado.' });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.senha);
        if (isMatch) {
            return done(null, user);
        }
        else {
            return done(null, false, { message: 'Senha incorreta.' });
        }
    }
    catch (error) {
        done(error);
    }
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => {
    // Busque o usuário pelo ID no banco de dados e retorne-o
    // ...
});
// Rotas
app.post('/login', passport_1.default.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/login'
}));
// app.get('/logout', (req: Request, res: Response) => {
//     req.logout();
//     res.redirect('/');
// });
app.post('/users', ensureAuthenticated, register_user_1.registerUser);
app.get('/users', fetch_user_1.fetchAllUsers);
app.get('/users/:id', fetch_one_user_1.fetchOneUser);
app.put('/users/:id', update_user_1.updateUser);
app.delete('/users/:id', delete_user_1.deleteUser);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
    conexao_1.sequelize.sync({ alter: true })
        .then(() => {
        console.log('Database synced');
    })
        .catch(error => {
        console.error('Error syncing database:', error);
    });
});
app.get('/', (req, res) => {
    res.send('Hello World');
});
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/login');
    }
}
