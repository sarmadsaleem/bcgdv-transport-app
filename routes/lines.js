const router = require('express').Router()
const linesController = require('../controllers/linesController')

router.get('/lines', linesController.getLines)
router.get('/lines/:linename', linesController.getDelays)

module.exports = router
