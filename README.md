# Problem

In the fictional city of Verspaetung, public transport is notoriously unreliable. To tackle the problem, the city council has decided to make the public transport timetables and delay information public, opening up opportunities for innovative use cases.
You are given the task to make use of that information and write an API that offers information on the public transport system of Verspaetung.
As a side note, the city of Verspaetung has been built on a strict grid, so all location information can be assumed to be from a cartesian coordinate system.

# Data

- Four csv files with timetable information of the public transport system
  - `lines.csv` which lists a public transport line with its id and a name
  - `stops.csv` which lists stops with an id and their coordinates
  - `stop_times.csv` which lists a stop id, a line id and a timestamp in the format of HH:MM:SS . For simplicity this timestamp is both departure and arrival time at a stop delays.csv which lists a line name and a delay in minutes. This data is static for now and assumed to be valid for any time of the day

# Task

Write a service exposing an API that provides the following endpoints:

- `lines`
  - `GET` request with the following parameters
  - `timestamp` : example value "10:00:00"
  - `x` : example value 10 (a coordinate)
  - `y` : example value 12 (a coordinate)
  - returning the current lines at the requested position
- `lines/<name>`
  - `GET` request answering the question of whether or not the given line is delayed at the moment

The service should run on port `8081`

# Getting start

```
# run in dev mode
docker-compose run --service-ports transport-app-dev

# run in prod mode
docker-compose run --service-ports transport-app-prod
```
