import express from 'express';
import {genError} from '../utils/makeError.js';
import Note from '../schema/noteSchema.js';
import User from '../schema/userSchema.js';
import jwt from 'jsonwebtoken';

import {parseToken} from '../utils/jwtParser.js'
import config from '../config.js';

const router = express.Router();

router.get('/query_all', async (req, res, next) => {
    try {
        const notes = await Note.find({}).populate('author', 'username uid');
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
});

router.post('/create', async (req, res, next) => {
    try {
        const note = req.body;
        if(!note) throw genError(400, '缺少必要参数');
        const userToken = parseToken(req);
        if(!userToken) throw genError(403, '没有给定 token');
        const userData = jwt.verify(userToken, config.TOKEN_SECRET);
        if(!userData) throw genError(403, 'token 无效，请重新登录');

        const author_user = await User.findOne({uid: userData.uid});
        if(!author_user) throw genError(400, 'token 指定的用户不存在');

        const newNote = new Note({
            title: note.title,
            author: author_user._id,
            content: note.content,
        });
        const result = await newNote.save();
        res.status(201).json({
            message: '创建成功',
        });
    } catch (error) {
        next(error);
    }
});

router.get('/userquery/:uid', async (req, res, next) => {
    const uid = req.params.uid;
    try {
        const noteList = await Note.find().populate('author', 'username uid');
        const userNote = noteList.filter(note => note.author.uid === uid);
        res.status(200).json(userNote);
    } catch (error) {
        next(error);
    }
});

router.get('/notequery/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const note = await Note.findOne({uid: id}).populate('author', 'username uid');
        if(!note) throw genError(404, '没有找到对应的笔记');
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const note = await Note.findOne({uid: id}).populate('author', 'username uid');
        const userToken = parseToken(req);
        if(!userToken) throw genError(403, '没有给定 token');
        const userData = jwt.verify(userToken, config.TOKEN_SECRET);
        if(!userData) throw genError(403, 'token 无效，请重新登录');
        if(note.author.uid !== userData.uid) throw genError(403, '用户匹配失效');
        const response = await Note.findOneAndDelete({uid: id});
        res.status(200).json({message: '删掉啦'});
    } catch (error) {
        next(error);
    }
});

export default router;

