const express = require('express');

const planetsRouter = require('./planets/planets.router');
const launchesRouter = require('./launches/launches.router');

const api = express.Router();


api.use('/planets', planetsRouter);
api.use('/launches', launchesRouter);

// 因為使用api的變數為Router()，所以不需要用{}當做物件輸出 
module.exports = api;
