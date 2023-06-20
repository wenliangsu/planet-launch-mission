const request = require('supertest');
const app = require('../../app');
const { response } = require('express');

describe('Test GET /launches', () => {
  test('It should respond with 200 success', async () => {
    const response = await request(app)
      .get('/launches')
      // note here can use the string or regular expression 
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

describe('Test POST /Launches', () => {
  test('It should respond with 200 success', () => {

  });

  test('It should catch missing required properties', () => {

  });

  test('It should catch invalid dates', () => {

  });

});