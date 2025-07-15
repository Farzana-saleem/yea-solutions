import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

export class User extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('NOW')
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('NOW')
        },
    },
    {
        sequelize,
        tableName: 'users',
    }
);
