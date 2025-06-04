export function parseToken(req) {
    const auth = req.get('authorization');
    if(!auth || !auth.startsWith('bearer ')) {
        return null;
    }
    return auth.replace('bearer ', '');
}