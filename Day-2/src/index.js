import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "../src/db/index.js";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTask,
} from "./controllers/todo.controller.js";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(express.json({ limit: "16kb" }));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.get("/api/get-all-tasks", getAllTodos);
app.post("/api/create-task", createTodo);
app.put("/api/update-task", updateTask);
app.delete("/api/delete-task/:id", deleteTodo);

app.listen(process.env.PORT || 8000, async () => {
  try {
    await connectDB();
    console.log(`Server running at port ${process.env.PORT || 8000}`);
  } catch (error) {
    console.log(error);
  }
});
