import {Result, ValidationError} from "express-validator";

export default class ApiError extends Error {
    public status: number
    public errors:  Result<ValidationError>

    constructor(status: number, message: string, errors: Result<ValidationError>) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static UnauthorizedError() {
        return new ApiError(401, 'User unauthorized', null)
    }

    static BadRequest(message: string, errors: Result<ValidationError> = null) {
        return new ApiError(400, message, errors)
    }
}