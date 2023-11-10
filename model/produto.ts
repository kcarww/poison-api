import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../db/conexao';

export class Product extends Model {
    public id!: number;
    public nome!: string;
    public categoria!: string;
    public preco!: number;
    public readonly createdAt!: Date;
}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        categoria: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        preco: {
            type: new DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        tableName: 'users',
        sequelize 
    },
);
