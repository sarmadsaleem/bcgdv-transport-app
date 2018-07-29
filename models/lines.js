const csv = require('csvtojson')

const getLines = async lineId => {
  const lines = await csv().fromFile('models/data/lines.csv')
  return lines.filter(l => l.line_id === lineId)
}

const getStops = async cordinates => {
  const stops = await csv().fromFile('models/data/stops.csv')
  return stops.filter(stop => stop.x === cordinates.x && stop.y === cordinates.y)
}

const getStopTimes = async (stopId, time) => {
  const stopTimes = await csv().fromFile('models/data/stop_times.csv')
  return stopTimes.filter(stopTime => stopTime.stop_id === stopId && stopTime.time === time)
}

const getDelays = async lineName => {
  const delays = await csv().fromFile('models/data/delays.csv')
  return delays.filter(delay => delay.line_name === lineName)
}

const lines = async (timestamp, cordinates) => {
  const matchingStops = await getStops(cordinates)
  const stopTimes = []
  for (s in matchingStops) {
    const time = await getStopTimes(s[0], timestamp)
    stopTimes.push(...time)
  }
  const lines = []
  for (t in stopTimes) {
    const line = await getLines(t[0])
    lines.push(...line)
  }
  return lines
}

module.exports = {
  lines,
  getDelays
}
