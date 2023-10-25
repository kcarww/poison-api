"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.status(401).send('Você precisa estar logado para acessar esta rota.');
    }
}
exports.ensureAuthenticated = ensureAuthenticated;
