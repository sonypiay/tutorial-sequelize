import Joi from "joi";

export const UserValidation = {
    register: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
        name: Joi.string().min(3).optional(),
    }),

    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required()
    }),
};