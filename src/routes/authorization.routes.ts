import { NextFunction, Router, Request, Response } from "express";
import ForbidenError from "../models/erros/forbidden.error.model";
import userRepository from "../repositories/user.repository";
import JWT from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";

const authorizationRoute = Router();

authorizationRoute.post('/token', async (req: Request, res: Response, next:NextFunction) => { 
    try {
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
        
        if(!user){
            throw new ForbidenError('Usuario ou senha invalidos!')
        }

       
    } catch (error) {
        next(error);
    }
});

export default authorizationRoute