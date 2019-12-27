import { verifyUserJwt } from "../../middlewares/authenticateHandler";
import { saveTodo, getAllTodo, getTodoById, updateTodo, deleteTodo } from "./Handlers";

export default router => {

  router.post("/todos", verifyUserJwt, function (req, res) {
    const user = req.user;
    const todo = req.body;
    todo.userId = user.id;
    todo.completed = false;
    saveTodo(todo)
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

  router.get("/todos", verifyUserJwt, function (req, res) {
    const user = req.user;

    getAllTodo(user.id)
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



  router.get("/todos/:todoId", verifyUserJwt, function (req, res) {
    const todoId = req.params.todoId;
    const userId = req.user.id;

    getTodoById(userId, todoId)
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

  router.patch("/todos/:todoId", verifyUserJwt, function (req, res) {
    const todo = req.body;
    const todoId = req.params.todoId;
    const userId = req.user.id;

    updateTodo(userId, todo, todoId)
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

  router.delete("/todos/:todoId", verifyUserJwt, function (req, res) {
    const todoId = req.params.todoId;
    const userId = req.user.id;

    deleteTodo(userId, todoId)
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

};