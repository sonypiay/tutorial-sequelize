import { Sequelize, Model } from "sequelize";
import connection from "../application/database.js";

class UsersModel extends Model {}

UsersModel.init({
    id: {
        type: Sequelize.DataTypes.CHAR(36),
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true
    },
    email: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: Sequelize.DataTypes.STRING(128),
    api_token: Sequelize.DataTypes.STRING(128),
    active: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    createdAt: Sequelize.DataTypes.DATE,
    updatedAt: Sequelize.DataTypes.DATE
}, {
    connection,
    modelName: 'Users',
});

export default UsersModel;