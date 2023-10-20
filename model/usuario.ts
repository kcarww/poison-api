import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../db/conexao';

export class User extends Model {
    public id!: number;
    public login!: string;
    public senha!: string;
    public categoria!: string;
    public readonly createdAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        login: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        senha: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        categoria: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
    },
    {
        tableName: 'users',
        sequelize 
    },
);
