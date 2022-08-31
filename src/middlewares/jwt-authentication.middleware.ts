import { NextFunction, Request, Response } from "express";
import ForbidenError from "../models/erros/forbidden.error.model";
import  JWT  from "jsonwebtoken";
import userRepository from '../repositories/user.repository'


async function wjtAthenticationMiddleware(req:Request, res:Response, next: NextFunction){
    try{

        const authorizationHeader = req.headers['authorization']

        if (!authorizationHeader) {
            throw new ForbidenError('credencias não informadas');
        }
        const [authenticationType, token] = authorizationHeader.split(' ');

        if(authenticationType !== 'Bearer' || !token){
            throw new ForbidenError('Tipo de autentificação invalida')
        }

    try{
        const tokenPayload = JWT.verify(token,'my_secret_key');

        if (typeof tokenPayload !== 'object' || !tokenPayload.sub){
            throw new ForbidenError('token invalido')
        }
        
        const user = {
            uuid: tokenPayload.sub,
            username: tokenPayload.username
        }

    req.user = user;
    next();

    }catch(error){
        throw new ForbidenError('token invalido')
    }
    }catch(error){
        next(error)
    }
}


export default wjtAthenticationMiddleware