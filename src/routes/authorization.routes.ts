import { NextFunction, Router, Request, Response } from "express";
import ForbidenError from "../models/erros/forbidden.error.model";
import JWT from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import basicAuthnticationMiddleware from "../middlewares/basic-authentication.middleware";
import wjtAthenticationMiddleware from "../middlewares/jwt-authentication.middleware";

const authorizationRoute = Router();

authorizationRoute.post('/token/validate', wjtAthenticationMiddleware, (req: Request, res: Response, next:NextFunction) => {
    res.sendStatus(StatusCodes.OK)
} )

authorizationRoute.post('/token',basicAuthnticationMiddleware , async (req: Request, res: Response, next:NextFunction) => { 
    try {
        const user = req.user;

        if(!user){
            throw new ForbidenError('usuario não informado!')
        }
        const jwtPayload = { username: user.username}
        const jwtOptions = {subject: user?.uuid}
        const secretKey = 'my_secret_key'

        const jwt = JWT.sign(jwtPayload, secretKey ,jwtOptions)
        
        res.status(StatusCodes.OK).json({token:jwt})
       
    } catch (error) {
        next(error);
    }
});


export default authorizationRoute