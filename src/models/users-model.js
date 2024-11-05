import { DataTypes } from "sequelize";
import Connection from "../application/database.js";

export const UsersModel = Connection.define('users', {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: DataTypes.STRING(128),
    api_token: DataTypes.STRING(128),
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    tableName: 'users'
});