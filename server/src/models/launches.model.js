const launchesDatabase = require('./launches.mongo');

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customers: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

async function getAllLaunches() {
  return launchesDatabase.find({}, { _id: 0, __v: 0 });
}


async function saveLaunch(launch) {
  await launchesDatabase.updateOne({
    flightNumber: launch.flightNumber,
  }, launch, {
    upsert: true,
  });
}

// note customer can send: mission, rocket, launchDate, destination
function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    // note object.assign is used to copy the launch object and add the new properties
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ['Wen', 'NASA'],
      flightNumber: latestFlightNumber,
    })
  );
}

function abortLaunchById(launchId) {
  // note 不用launches.delete(launchId)，資料還可以在利用
  const aborted = launches.get(launchId);

  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}


module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById
};