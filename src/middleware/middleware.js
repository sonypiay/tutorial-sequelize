import ResponseError from "../exceptions/response-error.js";

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