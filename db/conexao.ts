import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('poison', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

