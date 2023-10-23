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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const usuario_1 = require("../../model/usuario");
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const user = yield usuario_1.User.findByPk(id);
            if (!user) {
                return res.json({ error: 'User not found' });
            }
            const updatedUser = yield user.update(req.body);
            res.json(updatedUser);
        }
        catch (error) {
            if (error instanceof (Error))
                res.status(500).json({ error: error.message });
        }
    });
}
exports.updateUser = updateUser;
