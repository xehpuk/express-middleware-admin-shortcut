module.exports = function isAdmin(req, res, next) {
  const { user } = req

  if (!user.admin) {
    return next('route')
  }

  return next()
}
