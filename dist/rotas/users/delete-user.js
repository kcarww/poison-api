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
exports.deleteUser = void 0;
const usuario_1 = require("../../model/usuario");
function deleteUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = request.params;
        try {
            const user = yield usuario_1.User.findByPk(id);
            if (!user) {
                return response.json({ error: 'User not found' });
            }
            yield user.destroy();
            response.status(204).send();
        }
        catch (error) {
            if (error instanceof (Error))
                response.status(500).json({ error: error.message });
        }
    });
}
exports.deleteUser = deleteUser;
