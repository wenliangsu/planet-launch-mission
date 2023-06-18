const { launches } = require('../../models/launches.model');

function getAllLaunches(req, res) {

  /**  note 可以使用for (const value of launches.values()) { ... }
  但是要的是給front-end的json，所以還要轉換一次 */
  return res.status(200).json(Array.from(launches.values()));
}

module.exports = {
  getAllLaunches
};