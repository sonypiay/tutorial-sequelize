import { UserService } from "../services/user-service.js";
export const UserController = {};

UserController.register = {
    path: '/api/auth/register',
    handler: async(request, response, next) => {
        try {
            const result = await UserService.register(request);
            response.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
};

UserController.login = {
    path: '/api/auth/login',
    handler: async(request, response, next) => {
        try {
            const result = await UserService.login(request);
            response.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
};

UserController.getProfile = {
    path: '/api/users',
    handler: async(request, response, next) => {
        try {
            const result = await UserService.getProfile(request);
            response.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
};