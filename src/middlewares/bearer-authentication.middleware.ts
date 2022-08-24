import { NextFunction, Request, Response } from "express";
import ForbidenError from "../models/erros/forbidden.error.model";
import  Jwt  from "jsonwebtoken";
import userRepository from '../repositories/user.repository'


async function bearerAthenticationMiddleware(req:Request, res:Response, next: NextFunction){
    try{

        const authorizationHeader = req.headers['authorization']

        if (!authorizationHeader) {
            throw new ForbidenError('credencias não informadas');
        }
        const [authenticationType, token] = authorizationHeader.split(' ');

        if(authenticationType !== 'Bearer' || !token){
            throw new ForbidenError('Tipo de autentificação invalida')
        }
        const tokenPayload = Jwt.verify(token, 'my_secret_key')

        if (typeof tokenPayload !== 'object' || !tokenPayload.sub){
            throw new ForbidenError('token invalido')
        }
        const uuid = tokenPayload.sub;
        const user = await userRepository.findById(uuid)
        req.user = user;

        next()
    }catch(error){
        next(error)
    }
}


export default bearerAthenticationMiddleware