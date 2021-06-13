export {}
const Router = require('express')
const router = Router()
const authMiddleware = require('../middleware/auth.middleware.ts')
const {check} = require('express-validator')
const authController = require('../controllers/authController.ts')

router.post('/registration',
    [
        check('email').isEmail().withMessage({message: 'Incorrect email'}),
        check('password').isLength({min: 6, max: 12})
            .withMessage({message: 'Password must be longer 3 and shorted than 12'})
    ],
    authController.registration
)
router.get('/submit', authController.submit)
router.post('/login', authController.login)
router.get('/auth', authMiddleware, authController.auth)
router.delete('/user', authMiddleware, authController.deleteUser)


module.exports = router