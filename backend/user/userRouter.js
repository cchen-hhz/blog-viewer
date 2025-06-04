import express from 'express';
import User from '../schema/userSchema.js';
import bcrypt from 'bcrypt';
import config from '../config.js';
import {genError} from '../utils/makeError.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/query_all', async (req, res, next) => {
    try {
        const users = await User.find({});
        const userWithCount = users.map(user => {
            const {passwordHash, ...rest} = user.toObject();
            return {
                ...rest,
                notes: rest.notes.length
            }
        });
        res.status(200).json(userWithCount);
    } catch (error) {
        next(error);
    }
});

router.post('/qualify', async (req, res, next) => {
    const {username, password, usetoken} = req.body;
    try {
        const userData = await User.findOne({username: username});
        if (!userData) throw genError(404, '用户不存在');
        const passwordValid = await bcrypt.compare(password, userData.passwordHash);
        if (!passwordValid) throw genError(401, '密码错误');

        if(usetoken) {
            const userForToken = {
                username: userData.username,
                uid: userData.uid
            };
            const usertoken = jwt.sign(userForToken, config.TOKEN_SECRET, {
                expiresIn: config.TOKEN_EXPIRY,
            });
            res.status(200).json({
                message: 'Accepted',
                token: usertoken,
                uid: userData.uid,
            });
        } else {
            res.status(200).json({
                message: 'Accepted',
                uid: userData.uid,
            });
        }
    } catch (error) {
        next(error);
    }
});

router.post('/register', async (req, res, next) => {
    const {username, password} = req.body;
    try {
        if(!username || !password) throw genError(406, '用户名或密码不能为空');
        const existingUser = await User.findOne({username: username});
        if (existingUser) throw genError(406, '用户名已存在');
        const newPassword = await bcrypt.hash(password, Number(config.SALT_ROUNDS));
        console.log(newPassword);
        const person = new User({
            username: username,
            passwordHash: newPassword,  
        });
        
        const result = await person.save();
        res.status(201).json({
            message: '注册成功',
            username: username,
            uid: result.uid,
        });
    } catch (error) {
        next(error);
    }
});

export default router;