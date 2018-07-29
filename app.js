const express = require('express'),
  cors = require('cors'),
  errorhandler = require('errorhandler'),
  morgan = require('morgan'),
  helmet = require('helmet')

const isProduction = process.env.NODE_ENV === 'production'
const app = express()

// apply middleware
app.use(cors())
app.use(helmet())
app.use(morgan('combined'))

// use errorhandler only in non-production mode
if (!isProduction) {
  app.use(errorhandler())
}

// require routes
app.use(require('./routes'))

// catch 404
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

/// error handlers

// development error handler will print stacktrace
if (!isProduction) {
  app.use((err, req, res, next) => {
    console.log(err.stack)

    res.status(err.status || 500)

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    })
  })
}

// production error handler, no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  })
})

// finally, start server
const server = app.listen(process.env.PORT || 8081, function() {
  console.log('Listening on port ' + server.address().port)
})
