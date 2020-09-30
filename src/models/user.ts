import database from '../config/db';
import sequelize from 'sequelize';

// Database connection instance
let databaseInstance = new database().database;

// User Interface
export interface UserInterface {
  id?: string,
  email: string,
  password: string,
  confirmedPassword?: string,
  name: string;
  lastname: string;
  age: number;
}

// Sequelize Model
// export const User: sequelize.Model<UserInterface, {}> = databaseInstance.define<UserInterface, {}>("User", {
export const User: sequelize.ModelCtor<any> = databaseInstance.define("User", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: sequelize.TEXT,
    allowNull: false
  },
  name: {
    type: sequelize.STRING,
    allowNull: false
  },
  lastname: {
    type: sequelize.STRING,
    allowNull: false
  },
  age: {
    type: sequelize.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});