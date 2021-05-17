export {}
require('dotenv').config()
const Router = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const FileSchema = require('../models/File')
const fileService = require('../services/fileService')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')

router.post('/registration',
    [
        check('email').isEmail().withMessage({message: 'Incorrect email'}),
        check('password').isLength({min: 3, max: 12})
            .withMessage({message: 'Password must be longer 3 and shorted than 12'})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Incorrect request', errors})
            }
            const {email, password} = req.body
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: `User with email ${email} already exist`})
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = new User({email, password: hashPassword})
            await user.save()
            await fileService.createDir(req, new FileSchema({user: user.id, name: ''}))
            return res.status(200).json({message: 'Registration success'})
        } catch (e) {
            console.log(e)
            res.send({message: 'Server error'})
        }
    })


router.post('/login',
    async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user)
                return res.status(404).json({message: 'User not found'})
            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid)
                return res.status(400).json({message: 'Invalid password'})
            const token = jwt.sign({id: user._id}, process.env.SECRETKEY, {expiresIn: '1h'})
            return res.json({
                token,
                user: {
                    id: user._id,
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
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})
            console.log('req  user = ' + req.user.id)
            const token = jwt.sign({id: user._id}, process.env.SECRETKEY, {expiresIn: '1h'})
            return res.json({
                token,
                user: {
                    id: user._id,
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

module.exports = router