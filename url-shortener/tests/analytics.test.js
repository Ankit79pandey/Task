const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const URL = require('../models/URL');
const Analytics = require('../models/Analytics');

let server;
let token;
let shortUrlId;

beforeAll(async () => {
  server = app.listen(4000);
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
  const urlRes = await request(server)
    .post('/api/urls/create')
    .set('x-auth-token', token)
    .send({ originalUrl: 'https://example.com' });
  shortUrlId = urlRes.body._id;
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe('GET /api/analytics/:shortUrl', () => {
  it('should track URL access and redirect', async () => {
    const res = await request(server).get(`/api/analytics/${shortUrlId}`);
    expect(res.status).toBe(302); // Check for redirect
    const analytics = await Analytics.find({ urlId: shortUrlId });
    expect(analytics.length).toBeGreaterThan(0); // Check analytics entry
  });
});
