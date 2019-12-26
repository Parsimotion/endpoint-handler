const _ = require("lodash")

const endpointHandler = (action) => (req, res, next) => {
  const _respond = (body) => {
    if (res.headersSent) return
    res.send(body)
  }

  const _handleError = (err) => {
    if (err.stack) console.log(err.stack)
    if (res.headersSent) return

    if (err.statusCode) {
      res.status(err.statusCode).send(err.error || err.body)
    } else {
      res.status(500).send(err)
    }
  }

  let result = null
  try {
    result = action(req, res, next)
  } catch (err) {
    return _handleError(err)
  }

  if (result && result.then) {
    result.then(_respond).catch(_handleError)
  }

}

module.exports = (router) => {
  const _route = (verb, path, ...middlewares) => {
    const lastIndex = middlewares.length - 1;
    middlewares[lastIndex] = endpointHandler(middlewares[lastIndex]);
    router[verb].apply(router, [path].concat(middlewares));
  }

  const verbs = _(["get", "post", "put", "delete"])
      .keyBy()
      .mapValues(verb => _.partial(_route, verb))
      .value()

  return _.merge({ endpointHandler }, { route: verbs })

}