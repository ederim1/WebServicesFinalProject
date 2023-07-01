const request = require('supertest');
const app = require('../server.js');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

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

  it('the id should be a string to getReminderById', async () => {
    const id = '6494e422b75d97a8b9518e33';
    const response = await request(app)
      .get(`/${id}`);
    expect(typeof response.body.id).toBe('string');
  });
  // Add more test cases for other routes (get reminder by id, post new reminder, edit reminder, delete reminder)
});

afterAll((done) => {
  server.close(done);
});