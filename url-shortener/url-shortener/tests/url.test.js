const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');
const URL = require('../models/URL');

let server;
let token;
let userId;

beforeAll(async () => {
  server = app.listen(4000);
  // Create a test user for authentication
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
  userId = res.body.userId;
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe('POST /api/urls/create', () => {
  it('should create a new short URL', async () => {
    const res = await request(server)
      .post('/api/urls/create')
      .set('x-auth-token', token)
      .send({
        originalUrl: 'https://example.com',
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('shortUrl');
  });
});

describe('GET /api/urls', () => {
  it('should return all URLs for the authenticated user', async () => {
    const res = await request(server)
      .get('/api/urls')
      .set('x-auth-token', token);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
