import {IReq, IRes} from '../typings/IRoute'
import * as fs from 'fs'
import {IUser} from '../models/User'

const UserSchema = require('../models/User.ts')
const FileSchema = require('../models/File.ts')

require('dotenv').config()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {FileService} = require('../services/fileService.ts')
const mailService = require('../services/mailService.ts')


class AuthController {
    async registration(req: Request & IReq, res: Response & IRes) {
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
            const hashURL = await bcrypt.hash(email, 5)
            const user = new UserSchema({
                email, password: hashPassword,
                active: false, hash: hashURL
            }) as IUser
            await user.save()
            if (!fs.existsSync(req.filePath)) {
                try {
                    fs.mkdirSync(req.filePath)
                } catch (e) {
                    console.log(e)
                }

            }
            await FileService.createDir(req, new FileSchema({user: user._id, name: '', path: user._id}))

            await mailService.main(email, hashURL)
            return res.status(200).json({message: 'Registration success'})
        } catch (e) {
            console.log(e)
            res.send({message: 'Server error'})
        }
    }


    async submit(req: Request & IReq, res: Response & IRes) {
        try {
            console.log(req.query.hash)
            console.log(req.query)
            const user = await UserSchema.findOne({hash: req.query.hash}) as IUser
            if (!user) {
                return res.status(404).json({message: 'Hash incorrect'})
            } else {
                user.active = true
                user.hash = ''
                await user.save()
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
            }

        } catch (e) {
            console.log(e)
            return res.status(500).json('User submit error')
        }
    }

    async login(req: Request & IReq, res: Response & IRes) {
        try {
            const {email, password} = req.body

            const user = await UserSchema.findOne({email})
            if (!user)
                return res.status(404).json({message: 'User not found'})
            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid)
                return res.status(400).json({message: 'Invalid password'})

            if (user.active === false) {
                return res.status(400).json({message: 'User not submitted'})
            }
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
        } catch
            (e) {
            console.log(e)
            res.send({message: 'Server error'})
        }
    }

    async auth(req: Request & IReq, res: Response & IRes) {
        try {
            const
                user = await UserSchema.findOne({_id: req.user._id}) as IUser

            if (user.active === false) {
                return res.status(400).json({message: 'User not submitted'})
            }

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
        } catch
            (e) {
            console.log(e)
            res.send({message: 'Server error'})
        }
    }

    async deleteUser(req: Request & IReq, res: Response & IRes) {
        try {
            const user = await UserSchema.findOneAndDelete({_id: req.user._id}) as IUser
            return res.json({message: `User ${user.email} was deleted`})
        } catch (e) {
            console.log(e)
            return res.json({message: 'Delete user error'})
        }
    }
}
module.exports = new AuthController()