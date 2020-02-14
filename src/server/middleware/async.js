// TODO: Remove this module if we're not using it
module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res)
    }

    catch (ex) {
      next(ex)
    }
  }
}