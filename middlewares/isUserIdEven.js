module.exports = function isUserIdEven(req, res, next) {
  const { userId } = req

  if (userId % 2 !== 0) {
    return res.status(403).send('Odd user ID!')
  }

  return next()
}
