const users = require('../users.json')

module.exports = function isAuthenticated(req, res, next) {
  const { userId } = req

  const user = users.find((user) => user.id === userId)

  if (!user) {
    return res.status(401).send('User not found!')
  }

  req.user = user

  return next()
}
