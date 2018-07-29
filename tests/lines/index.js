process.env.NODE_ENV = 'test'

const chai = require('chai'),
  expect = chai.expect,
  chaiHttp = require('chai-http'),
  server = require('../../app.js')

chai.use(chaiHttp)

// BDD test for /lines
describe('/lines endpoint - returns current lines at the requested position', () => {
  const endpoint = '/api/v1/lines'

  it('should return 200 for valid payload', async () => {
    const payload = {
      x: '1',
      y: '1',
      timestamp: '10:00:00'
    }

    const expectedOutput = [
      {
        line_id: '0',
        line_name: 'M4'
      }
    ]

    const res = await chai
      .request(server)
      .get(endpoint)
      .query(payload)

    expect(res).to.have.status(200)
    expect(res.body).to.be.a('array')
    expect(res.body).to.be.lengthOf(1)
    expect(res.body).to.deep.equal(expectedOutput)
  })

  it('should return 404 when no matching line found', async () => {
    const payload = {
      x: '0',
      y: '0',
      timestamp: '10:00:00'
    }

    const expectedOutput = { info: ['No lines found'] }

    const res = await chai
      .request(server)
      .get(endpoint)
      .query(payload)

    expect(res).to.have.status(404)
    expect(res.body).to.be.a('object')
    expect(res.body).to.deep.equal(expectedOutput)
  })

  it('should return 400 when validation fails', async () => {
    const payload = {
      x: 'loremipsum!@#$#@!',
      y: '0',
      timestamp: '10:00:000'
    }

    const expectedOutput = { errors: ['Bad request, validation failed'] }

    const res = await chai
      .request(server)
      .get(endpoint)
      .query(payload)

    expect(res).to.have.status(400)
    expect(res.body).to.be.a('object')
    expect(res.body).to.deep.equal(expectedOutput)
  })
})

// BDD test for /lines/:linename
describe('/lines/:linename endpoint - returns delays for given linename', () => {
  it('should return 200 for valid payload', async () => {
    const linename = 'M4'
    const endpoint = `/api/v1/lines/${linename}`

    const expectedOutput = [
      {
        line_name: 'M4',
        delay: '1'
      }
    ]

    const res = await chai.request(server).get(endpoint)

    expect(res).to.have.status(200)
    expect(res.body).to.be.a('array')
    expect(res.body).to.be.lengthOf(1)
    expect(res.body).to.deep.equal(expectedOutput)
  })

  it('should return 404 when no delay are found', async () => {
    const linename = 'M5'
    const endpoint = `/api/v1/lines/${linename}`

    const expectedOutput = { info: [`No delays found for ${linename}`] }

    const res = await chai.request(server).get(endpoint)

    expect(res).to.have.status(404)
    expect(res.body).to.be.a('object')
    expect(res.body).to.deep.equal(expectedOutput)
  })

  it('should return 400 when validation fails', async () => {
    const linename = 'M5$!@#$%^&*()))_+'
    const endpoint = `/api/v1/lines/${linename}`

    const expectedOutput = { errors: ['Bad request, validation failed'] }

    const res = await chai.request(server).get(endpoint)

    expect(res).to.have.status(400)
    expect(res.body).to.be.a('object')
    expect(res.body).to.deep.equal(expectedOutput)
  })
})
