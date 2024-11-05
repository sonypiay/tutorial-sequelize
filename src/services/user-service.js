import { ValidationRequest } from "../validation/validation.js";
import { UsersModel } from "../models/users-model.js";
import ResponseError from "../exceptions/response-error.js";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export const UserService = {};

UserService.register = async(request) => {
    const requestBody = request.body;
    const registerRequest = ValidationRequest.handle(ValidationRequest.userRequest.register, requestBody);
    
    const isEmailUnique = await UsersModel.count({
        where: {
            email: registerRequest.email,
        }
    });

    if( isEmailUnique == 1 ) throw new ResponseError(400, `Email ${registerRequest.email} sudah terdaftar`);

    const hashPassword = await bcrypt.hash(registerRequest.password, await bcrypt.genSalt(10));
    const users = await UsersModel.create({
        id: uuidv4(),
        name: registerRequest.name,
        email: registerRequest.email,
        password: hashPassword,
    });

    return {
        data: users,
        message: 'OK',
    };
}

UserService.login = async(request) => {
    const requestBody = request.body;
    const loginRequest = ValidationRequest.handle(ValidationRequest.userRequest.login, requestBody);

    const result = await UsersModel.findOne({
        attributes: [
            'id','name','email'
        ],
        where: {
            email: loginRequest.email
        }
    });

    if( result === null ) throw new ResponseError(401, `Email ${loginRequest.email} tidak ditemukan`);

    const token = uuidv4();

    await UsersModel.update(
        {
            api_token: token,
        },
        {
            where: {
                email: loginRequest.email,
            },
        }
    );

    return {
        data: {
            id: result.dataValues.id,
            name: result.dataValues.name,
            email: result.dataValues.email,
            token: token,
        },
        message: 'OK',
    };   
}