const request = require('supertest');
const app = require('../../app');


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
  test('It should respond with 201 success', async () => {
    const completeLaunchData = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-186 f',
      launchDate: 'January 4, 2028', // req.body呈現的是JS object
    };

    const launchDateWithoutDate = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-186 f',
    };


    const response = await request(app)
      .post('/launches')
      .send(completeLaunchData)
      .expect('Content-Type', /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf(); // type is number
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(launchDateWithoutDate);

  });

  test('It should catch missing required properties', () => {

  });

  test('It should catch invalid dates', () => {

  });

});