import { Response } from "express";

const STATUS = {
    OK: {
        status: 200,
        message: 'OK',
    },
    CREATED: {
        status: 201,
        message: 'CREATED',
    },
    ACCEPTED: {
        status: 202,
        message: 'ACCEPTED',
    },
    NO_CONTENT: {
        status: 204,
        message: 'NO CONTENT',
    },
    RESET_CONTENT: {
        status: 205,
        message: 'RESET CONTENT',
    },
    BAD_REQUEST: {
        status: 400,
        message: 'BAD REQUEST'
    },
    UNAUTHORIZED: {
        status: 401,
        message: 'UNAUTHORIZED'
    },
    PAYMENT_REQUIRED: {
        status: 402,
        message: 'PAYMENT REQUIRED'
    },
    FORBIDDEN: {
        status: 403,
        message: 'FORBIDDEN'
    },
    NOT_FOUND: {
        status: 404,
        message: 'NOT FOUND'
    },

}

type STATUS_TYPE = "OK" | "CREATED" | "ACCEPTED" | "NO_CONTENT"
    | "RESET_CONTENT" | "BAD_REQUEST" | "UNAUTHORIZED" | "PAYMENT_REQUIRED"
    | "FORBIDDEN" | "NOT_FOUND"

const response = (res: Response, status: STATUS_TYPE, data?: Object) => {
    res.status(STATUS[status].status).json({
        ...STATUS[status],
        ...data
    })
}

export default response;