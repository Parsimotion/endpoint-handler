# endpoint-handler

Express error and response handler when using Promises.

## install

```
npm install endpoint-handler --save
```

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
- if you return a successful `Promise`, it responds a 200 code with the json.
- if you return a rejected `Promise`, it responds a 500 code with the error.
- if you return a `Promise` that fails with an object `{ statusCode, body }`, it responds a `statusCode` code with the `body`.
- if you throw an exception synchronously, it responds a 500 or the specified error if some.
