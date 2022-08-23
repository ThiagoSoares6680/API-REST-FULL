import { NextFunction, Request, Response } from "express";
import ForbidenError from "../models/erros/forbidden.error.model";
import userRepository from "../repositories/user.repository";


async function basicAuthnticationMiddleware(req:Request, res:Response, next: NextFunction){
    try{    
        const authorizationHeader = req.headers['authorization']

        if (!authorizationHeader) {
            throw new ForbidenError('credencias não informadas');
        }

        //basic admin

        const [authenticationType, token] = authorizationHeader.split(' ');

        if(authenticationType !== 'Basic' || !token){
            throw new ForbidenError('Tipo de autentificação invalida')
        }

        const tokenContent  = Buffer.from(token, 'base64').toString('utf-8')

        const [username, password] = tokenContent.split(':')

        if( !username || !password){
            throw new ForbidenError('Credencias não preenchidas')
        }
        const user = await userRepository.findByUsernameAndPassword(username, password);
        console.log(user)

        if (!user){
            throw new ForbidenError('Usuario ou senha invalidos!')
        }

        req.user = user
        next();
    }catch(error){
        next(error);
    }
}

export default basicAuthnticationMiddleware;