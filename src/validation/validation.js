import ResponseError from "../exceptions/response-error.js";
import { UserValidation } from "./user-validation.js";

export const ValidationRequest = {
    handle: (schema, request) => {
        const result = schema.validate(request, {
            abortEarly: false,
            allowUnknown: false,
        });
    
        if( result.error ) throw new ResponseError(400, result.error.message);
    
        return result.value;
    },
    userRequest: UserValidation
};