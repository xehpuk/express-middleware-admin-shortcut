module.exports = function isEditor(req, res, next) {
  const { user } = req

  if (!user.editor) {
    return res.status(403).send(`${user.name} is not an editor!`)
  }

  return next()
}
