import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import { User } from './user.model';

export class Task extends Model {
  public id!: number;
  public title!: string;
  public description?: string;
  public deadline?: Date;
  public done?: boolean;
  public userId!: number;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    deadline: {
      type: DataTypes.DATE,
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
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
    tableName: 'tasks',
  }
);

Task.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Task, { foreignKey: 'userId' });