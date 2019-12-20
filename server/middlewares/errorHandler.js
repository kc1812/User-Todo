export default (app) => {

  // error handling middleware must take four param method signature
  app.use((err, req, res, next) => {
    console.log(`here at errHandler ${err}`);
    res.status(err.status || 500).send(err || 'internal server error');
  });

};