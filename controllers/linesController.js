const moment = require('moment'),
  linesModel = require('../models/lines')

console.log(linesModel)

// validators
const isValidTime = time => moment(time, 'HH:mm:ss', true).isValid()
const isValidCordinate = cordinate => !isNaN(cordinate)

/** Handler for /lines endpoint */
exports.getLines = async (req, res, next) => {
  // sanitize and validate
  const timestamp = req.query.timestamp,
    x = req.query.x,
    y = req.query.y,
    cordinates = { x: x, y: y }

  if (!(isValidTime(timestamp) && isValidCordinate(x) && isValidCordinate(y))) {
    res.status(400).json({ errors: ['Bad request, validation failed'] })
  }
  // safe to proceed with execution
  else {
    const result = await linesModel.lines(timestamp, cordinates)
    result.length
      ? res.status(200).json(result)
      : res.status(404).json({ info: ['No lines found'] })
  }
}

/** Handler for /lines/:linename endpoint */
exports.getDelays = async (req, res, next) => {
  // sanitize and validate
  const linename = /^[a-z0-9]+$/i.test(req.params.linename)
    ? req.params.linename.trim().toUpperCase()
    : ''

  if (!linename) {
    res.status(400).json({ errors: ['Bad request, validation failed'] })
  }
  // safe to proceed with execution
  else {
    const result = await linesModel.getDelays(linename)
    result.length
      ? res.status(200).json(result)
      : res.status(404).json({ info: [`No delays found for ${linename}`] })
  }
}
