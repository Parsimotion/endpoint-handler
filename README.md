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

## 📦 Publishing a New Version

Package publishing is now handled automatically via a GitHub Action triggered on `push` to the `main` or `master` branches.

You can also trigger it manually from the **Actions** tab using the `Release` workflow.

The workflow supports prerelease versions (e.g., `alpha`, `beta`) through the `prereleaseTag` input.


## ✅ Commit Message Validation

[`commitlint`](https://github.com/conventional-changelog/commitlint) was added to ensure commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard.

Commit messages are automatically validated before each commit using [Husky](https://typicode.github.io/husky/).

**Example of a valid commit message:**

```bash
feat: add login functionality
```
> If the format is invalid, the commit will be blocked.
