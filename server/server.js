if (process.env.NODE_ENV === "prod") {
  require("babel-polyfill");
}

// import the env
import env from "./utils/envHandler";
import dbHandler from "./utils/dbHandler";
import errorHandler from "./middlewares/errorHandler";
import routes from "./routes";
import logger from "morgan";
import helmet from "helmet";
import passport from "passport";

// Common imports
import bodyParser from "body-parser";
import express from "express";
const app = express();

// when env is dev, log via morgan
if (process.env.NODE_ENV === "dev") {
  app.use(logger("dev"));
}

// Use helmet
app.use(helmet());

// parsing req/res body to json
app.use(bodyParser.json({ limit: "50mb" }));

// for parsing the url encoded data using qs library
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(passport.initialize());

// Load the routes
routes(app);



// adding err handling middleware, this is a post-call middleware
errorHandler(app);

// open db connection before server starts
dbHandler.openConnection().then(
  () => {
    console.log(`Db is connected`);

    // start server on port
    app.listen(env().PORT, () => {
      console.log(`server listening on ${env().PORT} `);
    });
  },
  err => {
    console.log("error in opening the connection", err);
  }
);

// kill process when Ctrl+C is hit
process.on("SIGINT", () => {
  dbHandler.closeConnection(() => {
    console.log("bye bye !");
    process.exit();
  });
});
