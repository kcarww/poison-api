"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const conexao_1 = require("../db/conexao");
class Product extends sequelize_1.Model {
}
exports.Product = Product;
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    categoria: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    preco: {
        type: new sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'products',
    sequelize: conexao_1.sequelize
});
