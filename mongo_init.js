db.createUser({
    user: 'cchen',
    pwd: '123456',
    roles: [
        {
            role: 'dbOwner',
            db: 'note_database',
        },
    ],
});

db.createCollection('users');
db.createCollection('notes');