module.exports = function addRoute({
  router,
  method,
  path,
  authMiddlewares = [],
  adminMiddlewares = [],
  nonAdminMiddlewares = [],
  middlewares = []
}) {
  router[method](path, authMiddlewares)
  router[method](path, adminMiddlewares, middlewares)
  router[method](path, nonAdminMiddlewares, middlewares)
}
