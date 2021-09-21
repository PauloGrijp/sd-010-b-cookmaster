const INTERNAL_ERROR = 500;
const BAD_REQUEST = 400;

module.exports = (err, req, res, _next) => {
  console.log(err);
  
  if (err.isJoi) {
    return res.status(BAD_REQUEST).json({
      message: err.details[0].message,
    });
  }

  if (err.isError) {
    const { code, message } = err;
    return res.status(code).json({
      message,
    });
  }

  res.status(INTERNAL_ERROR).json({
    err: {
      code: INTERNAL_ERROR,
      message: 'INTERNAL ERROR',
    },
  });
};
