// import { validator, anotherThingy } from "../../Validators/users";
import { getAllUser, getUser, saveUser, getUserByUsername } from "./Handler";
import { verifyUserLocal, getToken, verifyUserJwt } from "../../middlewares/authenticateHandler";

export default router => {
  router.get("/users", verifyUserJwt, function (req, res) {

    getAllUser()
      .then(data => {
        return res.status(data.statusCode).json({
          success: true,
          message: data.message
        });
      })
      .catch(err => {
        return res.status(err.statusCode || 500).json({
          success: false,
          message: err.message || "Internal server error",
          stacktrace: err
        });
      });
  });

  router.get("/users/:userId", verifyUserJwt, function (req, res) {
    const userId = req.params.userId;
    getUser(userId)
      .then(data => {
        return res.status(data.statusCode).json({
          success: true,
          message: data.message
        });
      })
      .catch(err => {
        return res.status(err.statusCode || 500).json({
          success: false,
          message: err.message || "Internal server error",
          stacktrace: err
        });
      });
  });

  router.post("/register", verifyUserJwt, function (req, res) {
    const user = req.body;
    getUserByUsername(user.username)
      .then(data => {
        const userFind = data.data;
        if (userFind) {
          return Promise.reject({
            statusCode: 400,
            message: "Username already in use"
          });
        }


      }, (err) => {
        return saveUser(user);
      })

      .then(data => {
        return res.status(data.statusCode).json({
          success: true,
          message: data.message
        });
      })
      .catch(err => {
        return res.status(err.statusCode || 500).json({
          success: false,
          message: err.message || "Internal server error",
          stacktrace: err
        });
      });


  });

  router.post("/login", verifyUserLocal, function (req, res, next) {

    const expiresIn = 3600;
    const token = getToken({ id: req.user.id, username: req.user.username }, expiresIn);
    return res.status(200).json({
      success: true,
      message: `Login for ${req.user.username} successful`,
      token: token,
      expiresIn: expiresIn
    });

  },
    function (err, req, res, next) {
      // Handle error
      console.log(111, err);
      return res.status(401).send({ success: false, message: err.message });
    });
};
