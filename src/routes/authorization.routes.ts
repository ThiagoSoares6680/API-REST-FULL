import { NextFunction, Router, Request, Response } from "express";
import ForbidenError from "../models/erros/forbidden.error.model";
import userRepository from "../repositories/user.repository";
import JWT from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import basicAuthnticationMiddleware from "../middlewares/basic-authentication.middleware";

const authorizationRoute = Router();

authorizationRoute.post('/token',basicAuthnticationMiddleware , async (req: Request, res: Response, next:NextFunction) => { 
    try {
        const user = req.user;

        if(!user){
            throw new ForbidenError('usuario não informado!')
        }
        const jwtPayload = { username: user.username}
        const my_secret_key = 'my_secret_key'

        const jwt =JWT.sign(jwtPayload, my_secret_key, {subject: user?.uuid})
        res.status(StatusCodes.OK).json({token: jwt})
       
    } catch (error) {
        next(error);
    }
});

export default authorizationRoute