const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');

let server;
let token;

beforeAll(async () => {
  server = app.listen(4000);
  // Create a test user for login
  const user = new User({
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password123',
  });
  await user.save();
  const res = await request(server).post('/api/auth/login').send({
    email: 'testuser@example.com',
    password: 'password123',
  });
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe('POST /api/auth/register', () => {
  it('should register a new user', async () => {
    const res = await request(server).post('/api/auth/register').send({
      username: 'newuser',
      email: 'newuser@example.com',
      password: 'password123',
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
  });
});

describe('POST /api/auth/login', () => {
  it('should login an existing user', async () => {
    const res = await request(server).post('/api/auth/login').send({
      email: 'testuser@example.com',
      password: 'password123',
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
