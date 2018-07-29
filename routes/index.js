const router = require('express').Router()

router.use('/api/v1', require('./lines'))

module.exports = router
