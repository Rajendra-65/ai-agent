import userModel from '../models/user.model.js';
import {createUser} from '../services/user.service.js'
import { validationResult } from 'express-validator';
import redisClient from '../services/redis.service.js';

export const createUserController = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const user = await createUser(req.body)
        const token = await user.generateJWT()
        res.status(201).json({user,token})
    }catch(error){
        res.status(400).send(error.message)
    }
}

export const loginController = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const {email,password} = req.body;
        const user = await userModel.findOne({email}).select('+password')
        if(!user){
            res.stats(401).json({
                errors:'Invalid credentials'
            })
        }
        const isMatch = await user.isValidPassword(password)
        if(!isMatch){
            return res.status(401).json({
                errors:'Invalid credentials'
            })
        }
        const token = await user.generateJWT()
        return res.status(201).json({
            user:user,
            token:token
        })
    }catch(error){
        res.status(400).send(error.message)
    }
}

export const profileController = async (req,res) => {
    console.log(req.user)
    res.status(200).json({
        user:req.user
    })
}