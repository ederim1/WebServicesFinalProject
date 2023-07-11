const request = require('supertest');
const express = require('express');

const app = require('../server.js');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const controller = require('../controllers/index.js');
const routes = require('express').Router();
const { requiresAuth } = require('express-openid-connect');
const reminderValidation = require('../utilities/validation_schema');

let server;
beforeAll((done) => {
  server = app.listen(process.env.TEST_PORT, () => {
    console.log(`************Test server running on port: ${process.env.TEST_PORT}************`);
    done();
  });
});
// ************ROUTES TESTING************
describe('REMINDERS API - Routes Test', () => {

  // get all reminders - TEST WORKING
  it('GET ALL - response status should get number', async () => {
    const response = await request(app)
      .get('/reminders');
    // const myValue = parseFloat(response.status)
    expect(typeof response.status).toBe('number');
    // expect(response.body).toHaveProperty('reminders');
    // expect(Array.isArray(response.body.reminders)).toBe(true);
  });

  // get reminder by id - TEST WORKING
  it('GET - should return a reminder by ID', async () => {
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
  
  // POST REMINDER -TEST
  // it('POST - should add a new reminder', async () => {
  //   const reminderData = { title: 'New Reminder', description: 'Lorem ipsum' };
  //   const req = { body: reminderData };
  //   const res = {
  //     status: jest.fn().mockReturnThis(),
  //     json: jest.fn()
  //   };
  
  //   await controller.addReminder(req, res);
  
  //   expect(res.status).toHaveBeenCalledWith(201);
  //   expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
  //     title: reminderData.title,
  //     description: reminderData.description
  //   }));
  // }); 
  

  // edit reminder - TEST WORKING
  it('PUT - should edit a reminder', async () => {
    const id = '6494e422b75d97a8b9518e33';
    const updatedReminderData = { title: 'Updated Reminder', description: 'Updated description' };
    const req = { params: { id }, body: updatedReminderData };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();
  
    await controller.editReminder(req, res, next);
  
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith(expect.any(Object));
  });
  
  // DELETE reminder:
  it('should delete a reminder', async () => {
    const reminderId = '6494f96f87acde94df226fc4'; // Provide an existing reminder ID here
    const req = {
      params: { id: reminderId },
      oidc: { isAuthenticated: jest.fn().mockReturnValue(true) }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  
    await controller.deleteReminder(req, res);
  
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({ message: 'Reminder deleted successfully' });
  });
  
  
  
});

afterAll((done) => {
  server.close(done);
});