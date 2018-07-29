# Solution

This is a simple ExpressJS based solution for the given [problem](docs/Problem.md).

## Notes

For brevity reasons, following decisions have been made while most production ready alternatives have been listed down as well.

- CSVs are being used as persistence layer, while in production this must be replaced with SQL/NoSQL layer to allow for battle tested performance and data management
- As far as the spec is concerned, nearest stop wasn't required. However can be calculated just as easily using distance formula

## Getting start

### Run on Docker

#### Prerequisites

- `Docker >= v17.3.1`

```
# run dev container in background, remove -d to run in foreground
docker-compose up -d transport-app-dev

# run prod container in background, remove -d to run in foreground
docker-compose up -d transport-app-prod

# stop container running in background
docker-compose stop <name>
```

### Run locally

#### Prerequisites

- `Node >= v8.x.x`
- `Yarn >= v1.5.0` or `NPM >= 5.x.x`

```
# clone repo
git clone https://github.com/sarmadsaleem/bcgdv-transport-app

# install dependencies (replace with npm if required)
yarn

# run app
node app.js

# run tests
yarn test
```

### Tests

- `/lines` endpoint - returns current lines at the requested position

  - ✓ should return 200 for valid payload
  - ✓ should return 404 when no matching line found
  - ✓ should return 400 when validation fails

- `/lines/:linename` endpoint - returns delays for given linename
  - ✓ should return 200 for valid payload
  - ✓ should return 404 when no delay are found
  - ✓ should return 400 when validation fails
