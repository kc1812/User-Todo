const bodyValidator = (req, res, next) => {

  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    next();
  } else if (!username && !password) {
    return res.status(400).json({
      success: false,
      message: "Bad request, Missing username and password in the request body",
      error: null
    });
  } else if (!username) {
    return res.status(400).json({
      success: false,
      message: "Bad request, Missing username in the request body",
      error: null
    });
  } else if (!password) {
    return res.status(400).json({
      success: false,
      message: "Bad request, Missing password in the request body",
      error: null
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Bad request, fields missing in the request body",
      error: null
    });
  }

};

module.exports = {
  bodyValidator
};
