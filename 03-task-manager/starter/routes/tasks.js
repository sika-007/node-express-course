const express = require("express");
const router = express.Router();
router.use(express.json());
const {
  getAllTasks,
  createTask,
  deleteTask,
  getTask,
  updateTask,
  editTask,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(createTask);
router
  .route("/:id")
  .get(getTask)
  .patch(updateTask)
  .delete(deleteTask)
  .put(editTask);

module.exports = router;
