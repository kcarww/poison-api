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
const express_session_1 = __importDefault(require("express-session"));
const express_mysql_session_1 = __importDefault(require("express-mysql-session"));
const logout_1 = require("./rotas/athenticate/logout");
const register_product_1 = require("./rotas/products/register-product");
const fetch_product_1 = require("./rotas/products/fetch-product");
const fetch_one_product_1 = require("./rotas/products/fetch-one-product");
const update_product_1 = require("./rotas/products/update-product");
const delete_product_1 = require("./rotas/products/delete-product");
const app = (0, express_1.default)();
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'poison'
};
const MySQLStoreFactory = (0, express_mysql_session_1.default)(express_session_1.default);
const sessionStore = new MySQLStoreFactory(options);
app.use((0, express_session_1.default)({
    name: 'sessioncookie',
    secret: '123',
    store: sessionStore,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));
app.use(express_1.default.json());
app.post('/login', authUser_1.authenticateUser);
app.get('/logout', logout_1.logout);
// user routes
app.post('/users', authUser_1.checkAuthentication, register_user_1.registerUser);
app.get('/users', authUser_1.checkAuthentication, fetch_user_1.fetchAllUsers);
app.get('/users/:id', authUser_1.checkAuthentication, fetch_one_user_1.fetchOneUser);
app.put('/users/:id', authUser_1.checkAuthentication, update_user_1.updateUser);
app.delete('/users/:id', authUser_1.checkAuthentication, delete_user_1.deleteUser);
// product routes
app.post('/product', authUser_1.checkAuthentication, register_product_1.registerProduct);
app.get('/product', authUser_1.checkAuthentication, fetch_product_1.fetchAllProducts);
app.get('/product/:id', authUser_1.checkAuthentication, fetch_one_product_1.fetchOneProduct);
app.put('/product/:id', authUser_1.checkAuthentication, update_product_1.updateProduct);
app.delete('/product/:id', authUser_1.checkAuthentication, delete_product_1.deleteProduct);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
    conexao_1.sequelize.sync({ alter: true, force: true })
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
