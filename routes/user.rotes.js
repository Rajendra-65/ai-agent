import {Router} from 'express'
import * as userController from '../controllers/user.controller.js'
import {body} from 'express-validator'
import * as authMiddeleware from '../midddleware/auth.middleware.js'
const router = Router()

router.post('/register',
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('password').isLength({min:3}).withMessage('password must be at least 3 charecters long'),
    userController.createUserController
)

router.post('/login',
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('password').isLength({min:3}).withMessage('password must be at least 3 charecters long'),
    userController.loginController
)

router.get('/profile',authMiddeleware.authUser,userController.profileController)

export default router