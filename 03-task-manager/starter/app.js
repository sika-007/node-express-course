const express = require("express");

const app = express();
const taskRouter = require("./routes/tasks");
const notFound = require("./middleware/not-found");
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/errorHandler");
require("dotenv").config();

app.use(express.static("./public"));
app.use("/api/v1/tasks", taskRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);

// Routes

// app.get("/api/v1/tasks")        - gets all tasks
// app.post("/api/v1/tasks")       - add a new task
// app.get("/api/v1/tasks/:id")    - get a single task
// app.patch("/api/v1/tasks/:id")  - update a single task
// app.delete("/api/v1/tasks/:id") - delete task

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Application running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
