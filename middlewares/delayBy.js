module.exports = function delayBy(ms) {
  return function delay(req, res, next) {
    setTimeout(next, ms)
  }
}
