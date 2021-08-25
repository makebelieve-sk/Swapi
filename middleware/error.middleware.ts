import {NextFunction, Request, Response} from "express";
import {CustomError} from "../types/error.types";

export default function (error: CustomError, req: Request, res: Response, next: NextFunction) {
    console.log(error.message)

    if (error.status !== 500) {
        return res.status(error.status).json({message: error.message, errors: error.errors})
    } else {
        return res.status(500).json({message: "Server error"})
    }
}