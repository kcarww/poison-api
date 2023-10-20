"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const conexao_1 = require("../db/conexao");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    login: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    senha: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    categoria: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
}, {
    tableName: 'users',
    sequelize: conexao_1.sequelize
});
