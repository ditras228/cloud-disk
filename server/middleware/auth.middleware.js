require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports=(req, res, next)=>{
    if(req.method === 'OPTIONS')
        next()
    try{
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        if(!token){
            return res.status(401).json({message: 'Auth error'})
        }
        const decoded = jwt.verify(token, process.env.SECRETKEY)
        console.log('decoded = '+JSON.stringify(decoded))
        console.log(decoded.id)
        req.user= decoded
        next()
    }
    catch (e){
        return res.status(401).json({message: 'Auth error'})
    }
}