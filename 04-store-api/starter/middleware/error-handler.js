const errorHandlerMiddleware = async (err, req, res, next) => {
  console.log(err);
  return res.status(500).json({ msg: err.toString() });
};

module.exports = errorHandlerMiddleware;
