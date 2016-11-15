_ = require("lodash")

module.exports = (router) ->

  endpointHandler = (action) =>
    (req, res, next) =>

      respond = (body) =>
        return if res.headersSent
        res.send body

      handleError = (err) =>
        console.log err.stack if err.stack?
        return if res.headersSent

        if err.statusCode?
          res.status(err.statusCode).send err.body
        else
          res.status(500).send (err.stack || err)

      result = null
      try
        result = action req, res, next
      catch err
        return handleError err

      result?.then? respond
      .catch? handleError

  route = (verb, path, middlewares...) ->
    lastIndex = middlewares.length - 1
    middlewares[lastIndex] = endpointHandler middlewares[lastIndex]
    router[verb].apply router, [path].concat middlewares

  verbs =
    _(["get", "post", "put", "delete"])
      .keyBy()
      .mapValues (verb) -> _.partial route, verb
      .value()

  _.merge { endpointHandler }, route: verbs
