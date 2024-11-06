import { Buffer } from 'node:buffer';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';
import Connection from "../application/database.js";
import ResponseError from "../exceptions/response-error.js";
import { ValidationRequest } from "../validation/validation.js";
import UsersModel from "../models/users-model.js";

export const UserService = {};

UserService.register = async(request) => {
    const registerRequest = ValidationRequest.handle(ValidationRequest.userRequest.register, request.body);
    const isEmailUnique = await UsersModel.isEmailUnique(registerRequest.email);
    
    if( isEmailUnique === true ) throw new ResponseError(400, `Email ${registerRequest.email} sudah terdaftar`);
    
    const hashPassword = await bcrypt.hash(registerRequest.password, await bcrypt.genSalt(12));
    const startTransaction = await Connection.transaction();
    
    try {
        const users = await UsersModel.create({
            id: uuidv4(),
            name: registerRequest.name,
            email: registerRequest.email,
            password: hashPassword,
        }, {
            transaction: startTransaction
        });

        await startTransaction.commit();
    
        return {
            data: users,
            message: 'OK',
        };
    } catch (error) {
        await startTransaction.rollback();
        throw new ResponseError(500, 'Registrasi gagal!');
    }
}

UserService.login = async(request) => {
    const loginRequest = ValidationRequest.handle(ValidationRequest.userRequest.login, request.body);
    const startTransaction = await Connection.transaction();

    const result = await UsersModel.login(loginRequest.email, startTransaction);
    if( result === null ) throw new ResponseError(401, `Email ${loginRequest.email} tidak ditemukan`);

    const matchPassword = await bcrypt.compare(loginRequest.password, result.get('password'));
    if( matchPassword === false ) throw new ResponseError(401, `Email atau password salah. Silakan coba lagi`);
    
    try {
        const newToken = uuidv4();
        const apiToken = Buffer.from(`${result.get('id')}:${newToken}`).toString('base64');

        await UsersModel.updateApiToken(newToken, loginRequest.email, startTransaction);
        
        const response = {
            data: {
                token: apiToken,
            },
            message: 'OK',
        };
        
        await startTransaction.commit();
        return response;
    } catch (error) {
        await startTransaction.rollback();
        throw error;
    }
}

UserService.getProfile = async(request) => {
    const users = await UsersModel.findOne({
        attributes: ['id', 'name', 'email'],
        where: {
            id: request.userId,
            api_token: request.apiToken,
        }
    });

    if( ! users ) throw new ResponseError(404, 'User not found');

    return {
        data: users
    }
}