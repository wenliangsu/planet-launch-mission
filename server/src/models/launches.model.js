const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');
const axios = require('axios');

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100, // flight_number
  mission: 'Kepler Exploration X', // name
  rocket: 'Explorer IS1', //rocket name
  launchDate: new Date('December 27, 2030'),// date_local
  target: 'Kepler-442 b', // new feature
  customers: ['ZTM', 'NASA'], // payloads.customers for each payload
  upcoming: true, // upcoming
  success: true, // success
};

saveLaunch(launch);

async function loadLaunchData() {
  console.log('Downloading launch data...');
  const response = await axios.post(SPACEX_API_URL, {
    // SpaceX query method
    query: {},
    options: {
      populate: [
        {
          path: 'rocket',
          select: {
            name: 1
          }
        },
        {
          path: 'payloads',
          select: {
            customers: 1
          }
        }
      ]
    }
  });

  const launchData = response.data.docs;
  console.log(launchData);
  for (const launchDoc of launchData) {
    const payloads = launchDoc['payloads'];
    const customers = payloads.flatMap((payload) => {
      return payload['customers'];
    });

    const launch = {
      flightNumber: launchDoc['flight_number'],
      mission: launchDoc['name'],
      rocket: launchDoc['rocket']['name'],
      launchDate: launchDoc['date_local'],
      upcoming: launchDoc['upcoming'],
      success: launchDoc['success'],
      customers
    };
    console.log(`${launch.flightNumber} ${launch.mission}`);
  };
}


launches.set(launch.flightNumber, launch);

async function existsLaunchWithId(launchId) {
  return await launchesDatabase.findOne({
    flightNumber: launchId,
  });
}

async function getLatestFlightNumber() {
  //note findOne()表示找mongoDB的document
  const latestLaunch = await launchesDatabase.findOne().sort('-flightNumber'); // flightNumber descending

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  //note 第二個參數表示不呈現，以0表示，要呈現則以1表示
  return launchesDatabase.find({}, { _id: 0, __v: 0 });
}


async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error('No matching planet found');
  }

  await launchesDatabase.findOneAndUpdate({
    flightNumber: launch.flightNumber,
  }, launch, {
    upsert: true,
  });
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = await getLatestFlightNumber() + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customer: ['Wen', 'NASA'],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
  const aborted = await launchesDatabase.updateOne({
    flightNumber: launchId,
  }, {
    upcoming: false,
    success: false,
  });

  //note 因delete後MongoDB有給許多的資訊，只需要給予一個資訊即可
  return aborted.modifiedCount === 1;
}


module.exports = {
  loadLaunchData,
  existsLaunchWithId,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById
};