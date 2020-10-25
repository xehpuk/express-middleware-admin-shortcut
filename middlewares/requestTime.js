module.exports = function requestTime(req, res, next) {
  req.time = Date.now()

  return next()
}
