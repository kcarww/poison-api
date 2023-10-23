"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conexao_1 = require("./db/conexao");
const register_user_1 = require("./rotas/users/register-user");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/users', register_user_1.registerUser);
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
