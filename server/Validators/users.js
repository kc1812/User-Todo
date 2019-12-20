const validator = (req, res, next) => {
  const name = req.query.name;
  if (name) {
    next();
  } else {
    return res.status(400).json({
      success: false,
      message: "Bad request, missing field name in the query"
    });
  }
};

const anotherThingy = a => {
  return a;
};

module.exports = {
  validator,
  anotherThingy
};
