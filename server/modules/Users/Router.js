import { getAllUser, getUserById, saveUser, getUserByUsername } from "./Handler";
import { verifyUserLocal, getToken, verifyUserJwt } from "../../middlewares/authenticateHandler";
import { bodyValidator } from "../../Validators/users";

export default router => {

  router.all("/register", function (req, res, next) {
    if (req.method == "POST") {
      next();
    } else {
      return res.status(405).json({
        success: false,
        message: "Method not allowed",
        error: null
      });
    }
  });
  router.post("/register", bodyValidator, function (req, res) {
    const user = req.body;
    getUserByUsername(user.username)
      .then(result => {
        const userFound = result.data;
        if (userFound) {
          return Promise.reject({
            statusCode: 409,
            message: "Conflict, Username already in use",
            error: null
          });
        }


      }, (err) => {
        if (err.statusCode == 404) {
          // creating new user as user doesnot exist
          return saveUser(user);
        }
        //otherwise error
        return Promise.reject({
          statusCode: err.statusCode,
          message: err.message,
          error: err.error
        });

      })

      .then(result => {
        //response from saveUser
        return res.status(result.statusCode).json({
          success: true,
          message: result.message,
          data: result.dsta
        });
      })
      .catch(err => {

        return res.status(err.statusCode || 500).json({
          success: false,
          message: err.message || "Internal server error",
          error: err.error
        });
      });


  });

  router.all("/login", function (req, res, next) {
    if (req.method == "POST") {
      next();
    } else {
      return res.status(405).json({
        success: false,
        message: "Method not allowed",
        error: null
      });
    }
  });
  router.post("/login", bodyValidator, verifyUserLocal, function (req, res, next) {

    const expiresIn = 3600;
    const token = getToken({ id: req.user.id, username: req.user.username }, expiresIn);
    return res.status(200).json({
      success: true,
      message: `${req.user.username} successfully logged in! `,
      data: {
        token: token,
        expiresIn: expiresIn
      }
    });

  },
    function (err, req, res, next) {
      // Handle error

      let statusCode = 401;
      if (err.statusCode == 404 || err.statusCode == 422) {
        //404 for user not found
        //422 for invalid password
        statusCode = err.statusCode;
      }

      return res.status(statusCode).send({ success: false, message: err.message, error: err.error });
    });

  router.all("/users", function (req, res, next) {
    if (req.method == "GET") {
      next();
    } else {
      return res.status(405).json({
        success: false,
        message: "Method not allowed",
        error: null
      });
    }
  });
  router.get("/users", verifyUserJwt, function (req, res) {

    getAllUser()
      .then(result => {
        return res.status(result.statusCode).json({
          success: true,
          message: result.message,
          data: result.data
        });
      })
      .catch(err => {
        return res.status(err.statusCode || 500).json({
          success: false,
          message: err.message || "Internal server error",
          error: err.error
        });
      });
  });
  router.all("/users/:userId", function (req, res, next) {
    if (req.method == "GET") {
      next();
    } else {
      return res.status(405).json({
        success: false,
        message: "Method not allowed",
        error: null
      });
    }
  });
  router.get("/users/:userId", verifyUserJwt, function (req, res) {
    const userId = req.params.userId;
    getUserById(userId)
      .then(result => {
        return res.status(result.statusCode).json({
          success: true,
          message: result.message,
          data: result.data
        });
      })
      .catch(err => {
        return res.status(err.statusCode || 500).json({
          success: false,
          message: err.message || "Internal server error",
          error: err
        });
      });
  });

};
