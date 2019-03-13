const request = require('supertest');
const server = require('./server');


test('should have env=testing', () => {
    expect(process.env.DB_MODE).toBe('testing')
})

describe('/api/auth', () => {
    const userToLogIn = {}
    test('should return a token, username and status of 201', async () => {
        const newUser = {username: (new Date).toString(), password: 'pass'}
        userToLogIn.username = newUser.username
        userToLogIn.password = 'pass'
        const result = await request(server).post('/api/auth/signup').set('Content-Type', 'application/json').send(JSON.stringify(newUser))
        const {username, token} = result.body;
        expect(result.status).toEqual(201)
        expect(username).toBe(newUser.username)
        expect(token).toBeDefined()
    })
    test('should sign a user in, returning a token, username and status 200', async () => {
        const result = await request(server).post('/api/auth/login').set('Content-Type', 'application/json').send(JSON.stringify(userToLogIn))
        const {username, token} = result.body;
        expect(result.status).toEqual(200)
        expect(username).toBe(userToLogIn.username)
        expect(token).toBeDefined()
    })
})
