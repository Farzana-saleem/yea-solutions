import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME as string || 'yea-solutions-db',
  process.env.DB_USER as string || 'root',
  process.env.DB_PASSWORD as string || '',
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);


export const connectDB = async () => {
  try {
    await sequelize.authenticate()
      .then(() => {
        console.info('Database connected successfully!')
      });
  } catch (error) {
    console.error('Unable to connect to DB:', error);
    process.exit(1);
  }
};