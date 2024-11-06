import { Sequelize, DataTypes, Model, Op } from "sequelize";
import Connection from "../application/database.js";

class UsersModel extends Model {
    static async findByEmail(email) {
        return await this.findOne({
            where: {
                email: email
            }
        })
    }

    static async isEmailUnique(email, id = '') {
        const whereCondition = {};

        whereCondition.email = email;
        
        if( id ) {
            whereCondition.id = { 
                [Op.ne]: id 
            };
        }

        const result = await this.count({
            where: whereCondition
        });

        return result === 0 ? false : true;
    }

    static async login(email, transaction) {
        return await this.findOne({
            attributes: [
                'id','name','email', 'password',
            ],
            where: {
                email: email,
                active: true
            },
            transaction: transaction
        });
    }

    static async updateApiToken(token, email, transaction) {
        return await this.update(
            {
                api_token: token,
            },
            {
                where: {
                    email: email,
                },
                transaction: transaction
            }
        );
    }
}

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
    sequelize: Connection,
    tableName: 'users',
    modelName: 'Users'
});

export default UsersModel;