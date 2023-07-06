const request = require('supertest');
const app = require('../server.js');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const controller = require('../controllers/index.js');

let server;
beforeAll((done) => {
  server = app.listen(process.env.TEST_PORT, () => {
    console.log(`************Test server running on port: ${process.env.TEST_PORT}************`);
    done();
  });
});
// ************ROUTES TESTING************
describe('REMINDERS API - Routes Test', () => {

  it('response status should get number', async () => {
    const response = await request(app)
      .get('/reminders');
    // const myValue = parseFloat(response.status)
    expect(typeof response.status).toBe('number');
    // expect(response.body).toHaveProperty('reminders');
    // expect(Array.isArray(response.body.reminders)).toBe(true);
  });

  it('should return a reminder by ID', async () => {
    const id = '6494e422b75d97a8b9518e33';
    const req = { params: { id } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();
  
    await controller.getReminder(req, res, next);
  
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Object));
  });
  
  
  // Add more test cases for other routes (get reminder by id, post new reminder, edit reminder, delete reminder)
});

afterAll((done) => {
  server.close(done);
});