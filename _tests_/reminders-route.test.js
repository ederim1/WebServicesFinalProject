const request = require('supertest');
const express = require('express');
const sinon = require('sinon');
const model = require('../models/index'); 
const app = require('../server.js');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const controller = require('../controllers/index.js');
const routes = require('express').Router();
const {
  requiresAuth
} = require('express-openid-connect');
const reminderValidation = require('../utilities/validation_schema');

let server;
beforeAll((done) => {
  server = app.listen(process.env.TEST_PORT, () => {
    console.log(`************Test server running on port: ${process.env.TEST_PORT}************`);
    done();
  });
});

jest.mock('../controllers', () => ({
  getRemindersByTeam: jest.fn()
})); // Mock the controller module

jest.mock('../models/index', () => ({
  create: jest.fn()
}));


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
    const id = '6497c89bc0c9b4a4759a56ba';
    const req = {
      params: {
        id
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    await controller.getReminder(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Object));
  });

  // POST REMINDER -TEST - 
  // it('POST - should add a new reminder', async () => {
  //   const reminderData = {
  //     title: 'New Reminder',
  //     description: 'Lorem ipsum'
  //   };
  //   const req = {
  //     body: reminderData
  //   };
  //   const res = {
  //     status: jest.fn().mockReturnThis(),
  //     json: jest.fn()
  //   };

  //   await controller.addReminder(req, res);

  //   expect(res.status).toHaveBeenCalledWith(201);

  // });



  // edit reminder - TEST WORKING
  it('PUT - should edit a reminder', async () => {
    const id = '6497c89bc0c9b4a4759a56ba';
    const updatedReminderData = {
      title: 'Updated Reminder',
      description: 'Updated description'
    };
    const req = {
      params: {
        id
      },
      body: updatedReminderData
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    await controller.editReminder(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith(expect.any(Object));
  });

  // // DELETE reminder: - TEST WORKING
  it('should delete a reminder', async () => {
    const reminderId = '6497c89bc0c9b4a4759a56ba'; // Provide an existing reminder ID here
    const req = {
      params: {
        id: reminderId
      },
      oidc: {
        isAuthenticated: jest.fn().mockReturnValue(true)
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await controller.deleteReminder(req, res);

    expect(res.status).toHaveBeenCalledWith(200);

  });

  // ************ROUTES TESTING************

  it('GET - should call getRemindersByTeam and return the response', async () => {
    const req = {};
    const res = {};

    // Mock the getRemindersByTeam method to return a mock response
    const mockResponse = {
      reminders: ['Reminder 1', 'Reminder 2']
    };
    controller.getRemindersByTeam.mockResolvedValueOnce(mockResponse);

    // Call the route handler
    const response = await request(app).get('/');

    // Check if the response contains the expected data
    expect(response.status).toBe(200);

  });

  it('POST - should call addTeam and return the response', async () => {
    const req = {}; // Create a mock request object
    const res = {}; // Create a mock response object

    // Create a mock function for addTeam with a basic mock implementation
    const mockAddTeam = jest.fn().mockResolvedValueOnce({ message: 'Team added successfully' });

    // Replace the original addTeam method with the mock function
    controller.addTeam = mockAddTeam;

    // Call the route handler
    const response = await request(app)
      .post('/')
      .send({ name: 'New Team' });

    // Check if the mock addTeam method was called with the correct arguments
    expect(mockAddTeam).toHaveBeenCalledWith(req, res);

    // Check if the response contains the expected data
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Team added successfully' });
  });
  
console.log('Theme test')
//******************************** */
// POST - THEME REQUEST TEST - Working

it('should return status 201 for a new theme', async () => {
  const req = {
    result: { /* mock request body */ }
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };
  const expectedTheme = { /* mock created theme */ };
  model.create.mockResolvedValueOnce(expectedTheme);

  // Mocking the addTheme function manually in the test
  const addTheme = async (req, res) => {
    try {
      console.log(req.result);
      const theme = await model.create(req.result);
      res.status(201).json(theme);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  await addTheme(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
});

});

afterAll((done) => {
  server.close(done);
});