import dotenv from 'dotenv';
dotenv.config();

import {Sequelize, DataTypes, Op, QueryTypes} from 'sequelize';
const { DB_HOST, DB_USER, DB_PORT, DB_PASSWORD, DB_NAME } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  
  dialect: 'postgres',
  logging: false,
  define: {
    timestamps: false
  }
});
})