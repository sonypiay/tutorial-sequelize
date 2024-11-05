// import UsersModel from "../models/users-model.js";
import { ValidationRequest } from "../validation/validation.js";

export const UserService = {};

UserService.register = async(request) => {
    const requestBody = request.body;
    const registerRequest = ValidationRequest.handle(ValidationRequest.userRequest.register, requestBody);

    return {
        data: registerRequest,
    };
}

UserService.login = async(request) => {
    const requestBody = request.body;
    const loginRequest = ValidationRequest.handle(ValidationRequest.userRequest.login, requestBody);

    return {
        data: loginRequest,
    };   
}