module.exports = function userId(req, res, next, userId) {
  req.userId = Number.parseInt(userId, 10)

  return next()
}
