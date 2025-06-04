export function errorHandler(err, req, res, next) {
    /* mongoose erorr handle*/
    if (err.name === 'ValidationError') {
        err.status = 400;
        err.message = '不符合格式'
    }
    else if(err.name === 'MongoServerError') {
        err.status = 400;
        err.message = '数据重复';
    }
    /*---------*/
    
    if(!err.status) {
        console.error('Unexpected Error:', err);
        console.error(req.path);
        res.status(500).json({ message: 'Internal Server Error' });
    }
    else if(err.status === 500) {
        console.error('Internal Server Error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    } else {
        res.status(err.status).json({
            message: err.message || '没有 message ',
        });
    }
    next();
}