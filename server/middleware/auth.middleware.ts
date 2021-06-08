import {NextFunction} from 'express'

require('dotenv').config()
import {IReq, IRes} from '../typings/IRoute'

const jwt = require('jsonwebtoken')

module.exports=(req: Request & IReq, res: Response & IRes, next: NextFunction)=>{
    if(req.method === 'OPTIONS')
        next()
    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({message: 'Auth token error'})
        }
        req.user= jwt.verify(token, process.env.SECRETKEY)
        next()
    }
    catch (e){
        return res.status(401).json({message: 'Auth error'})
    }
}

