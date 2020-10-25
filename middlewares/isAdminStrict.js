module.exports = function isAdminStrict(req, res, next) {
  const { user } = req

  if (!user.admin) {
    return res.status(403).send(`${user.name} is not an admin!`)
  }

  return next()
}
