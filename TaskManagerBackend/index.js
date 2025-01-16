import express from "express";
import cors from "cors";
import tasksRouter from "./routes/tasks.js";
import usersRouter from './routes/users.js';

const PORT = 8000;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/tasks", tasksRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("TaskManagerBackend");
});

app.listen(PORT, () => {
  console.log(`Poslužitelj sluša na http://localhost:${PORT}`);
});