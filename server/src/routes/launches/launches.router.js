const express = require('express');
const { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch } = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);
// also can use PUT method, it can be decided by how the data you want to operate 
launchesRouter.delete('/:id', httpAbortLaunch);

module.exports = launchesRouter;