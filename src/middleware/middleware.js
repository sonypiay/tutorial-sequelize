import { request } from "express";
import ResponseError from "../exceptions/response-error.js";
import UsersModel from "../models/users-model.js";

export const Middleware = {};

Middleware.errorException = async(err, request, response, next) => {
    if( ! err ) {
        next(); return;
    }

    const responseData = {
        status: err instanceof ResponseError ? err.status : 500,
        message: err.message,
    }

    response.status(responseData.status).json({
        errors: responseData.message
    })
    .end();
};

Middleware.validateApiToken = async(request, response, next) => {
    const getAuthorization = request.get('authorization');
    
    if( ! getAuthorization ) {
        response.status(401).json({
            errors: 'Unauthorized'
        }).end();
    } else {
        const getBasicAuth = getAuthorization.replace('Basic ', '');
        const decodeToken = Buffer.from(getBasicAuth, 'base64').toString('ascii');
        const parsingToken = decodeToken.split(':');

        const userId = parsingToken[0] ?? null;
        const apiToken = parsingToken[1] ?? null;

        const verifyToken = await UsersModel.count({
            where: {
                id: userId,
                api_token: apiToken
            }
        });

        if( verifyToken === 0 ) {
            response.status(401).json({
                errors: 'Unauthorized'
            }).end();          
        } else {
            request.apiToken = apiToken;
            request.userId = userId;
            
            next();
        }
    }
};