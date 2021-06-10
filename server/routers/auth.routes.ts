import {IReq, IRes} from '../typings/IRoute'
const UserSchema= require('../models/User.ts')
const FileSchema= require('../models/File.ts')

require('dotenv').config()
import * as fs from 'fs'
import {IUser} from '../models/User'
const Router = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const  {check, validationResult} = require('express-validator')
const {FileService} = require( '../services/fileService.ts')
const authMiddleware = require('../middleware/auth.middleware.ts')
const router =new  Router()

router.post('/registration',
    [
        check('email').isEmail().withMessage({message: 'Incorrect email'}),
        check('password').isLength({min: 3, max: 12})
            .withMessage({message: 'Password must be longer 3 and shorted than 12'})
    ],
    async (req: Request & IReq, res: Response &IRes) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Incorrect request', errors})
            }
            const {email, password} = req.body
            const candidate = await UserSchema.findOne({email})
            if (candidate) {    
                return res.status(400).json({message: `User with email ${email} already exist`})
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = new UserSchema({email, password: hashPassword})
            await user.save()
            if(!fs.existsSync(req.filePath)){
                try{
                    fs.mkdirSync(req.filePath)
                }catch(e){
                    console.log(e)
                }

            }
            await FileService.createDir(req, new FileSchema({user: user._id, name: '', path: user._id}))
            return res.status(200).json({message: 'Registration success'})
        } catch (e) {
            console.log(e)
            res.send({message: 'Server error'})
        }
    })


router.post('/login',
    async (req: Request & IReq, res: Response & IRes) => {
        try {
            const {email, password} = req.body

            const user = await UserSchema.findOne({email})
            if (!user)
                return res.status(404).json({message: 'User not found'})
            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid)
                return res.status(400).json({message: 'Invalid password'})
            const token = jwt.sign({_id: user._id}, process.env.SECRETKEY, {expiresIn: '1h'})
            return res.json({
                token,
                user: {
                    _id: user._id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: 'Server error'})
        }
    })


router.get('/auth', authMiddleware,
    async (req: Request & IReq, res:Response & IRes) => {
        try {
            const  user = await UserSchema.findOne({_id: req.user._id}) as IUser
            const token = jwt.sign({_id: user._id}, process.env.SECRETKEY, {expiresIn: '1h'})
            return res.json({
                token,
                user: {
                    _id: user._id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: 'Server error'})
        }
    })

router.delete('/user', authMiddleware,
    async (req: Request & IReq, res: Response & IRes)=>{
        try{
            const user = await UserSchema.findOneAndDelete({_id: req.user._id}) as IUser
            return res.json({message: `User ${user.email} was deleted`})
        }catch(e){
            console.log(e)
            return res.json({message:'Delete user error'})
        }
    })




module.exports = router