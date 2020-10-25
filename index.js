const express = require('express')

const addRoute = require('./addRoute.js')

const userId = require('./param/userId.js')

const delayBy = require('./middlewares/delayBy.js')
const isAuthenticated = require('./middlewares/isAuthenticated.js')
const isAdmin = require('./middlewares/isAdmin.js')
const isEditor = require('./middlewares/isEditor.js')
const isUserIdEven = require('./middlewares/isUserIdEven.js')
const requestTime = require('./middlewares/requestTime.js')

const app = express()
const router = express.Router()

router.use(requestTime)
router.param('userId', userId)

addRoute({
  router,
  method: 'get',
  path: '/user/:userId',
  authMiddlewares: isAuthenticated,
  adminMiddlewares: isAdmin,
  nonAdminMiddlewares: [isUserIdEven, delayBy(1000), isEditor],
  middlewares: (req, res) => {
    const { time, user } = req

    const duration = Date.now() - time

    res.send(`Moin, <em>${user.name}</em>! The middlewares took <strong>${duration}ms</strong>.`)
  }
})

app.use(router)

const [,, port] = process.argv

const server = app.listen(port, () => console.log(`Listening on port ${server.address().port}.`))
