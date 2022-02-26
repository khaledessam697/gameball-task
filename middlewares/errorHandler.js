const errorHandler = () => {
  return (err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message;

    return res.status(status).json({
      defaultResponse: {
        errorMessage: message,
        code: status,
        successful: false,
      },
    });
  };
};

module.exports = {
  errorHandler
};