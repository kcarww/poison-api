"use strict";
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
const authUser_1 = require("./rotas/athenticate/authUser");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/login', authUser_1.authenticateUser);
app.post('/users', register_user_1.registerUser);
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
