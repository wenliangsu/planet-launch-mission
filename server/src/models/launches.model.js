const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  destination: 'Kepler-442 b',
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};


launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
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


module.exports = {
  getAllLaunches,
  addNewLaunch
};