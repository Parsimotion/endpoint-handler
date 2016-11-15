# endpoint-handler

Express error and response handler when using Promises.

## usage
```coffee
express = require("express")
controller = require("./controller")
router = express.Router()
{ route } = require("endpoint-handler") router

# router.use <<middleware>>

route.get "/", controller.get
route.put "/", controller.update

module.exports = router
```

## features
- if you return a sucessful `Promise` responds a 200 code with the json.
- if you return a rejected `Promise` responds a 500 code with the error.
- if you return a `Promise` that fails with an object `{ statusCode, body }`, responds a `statusCode` code with the `body`.
- if you return a *no-thenable*, you are turning off the endpoint handler.
