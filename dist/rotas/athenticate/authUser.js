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
exports.checkAuthentication = exports.authenticateUser = void 0;
const usuario_1 = require("../../model/usuario");
const bcrypt_1 = __importDefault(require("bcrypt"));
function authenticateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { login, senha } = req.body;
        try {
            const user = yield usuario_1.User.findOne({
                where: { login }
            });
            if (user) {
                bcrypt_1.default.compare(senha, user.senha, (err, result) => {
                    if (err) {
                        return res.status(401).json({ success: false, message: 'Ocorreu um erro ao verificar a senha!' });
                    }
                    if (result) {
                        return res.json({ success: true, message: 'Autenticado' });
                        req.session.id = user.id.toString();
                        req.session.save();
                    }
                    return res.status(401).json({ success: false, message: 'Nome de usuário ou senha incorretos!' });
                });
            }
            else {
                return res.status(401).json({ success: false, message: 'Nome de usuário não encontrado!' });
            }
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Erro no servidor!', error: error.message });
        }
    });
}
exports.authenticateUser = authenticateUser;
function checkAuthentication(req, res, next) {
    console.log(`result === ${req.session.id}`);
    if (req.session.id != '0') {
        next();
    }
    else {
        res.status(403).send('Não autorizado');
    }
}
exports.checkAuthentication = checkAuthentication;
