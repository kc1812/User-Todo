import express from "express";
const router = express.Router();

// Import all the custom routes
const routes = [
  require("./modules/Users/Router")
];

export default app => {
  // passing router object to all custom router object methods
  routes.forEach(routeObj => {
    routeObj.default(router);
  });

  // register routes to app
  app.use(router);
};
