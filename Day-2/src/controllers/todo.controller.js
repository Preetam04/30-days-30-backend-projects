import mongoose from "mongoose";
import { Todo } from "../model/todo.model.js";

async function getAllTodos(req, res) {
  const allTasks = await Todo.find();

  if (!allTasks) {
    return res.status(404).json({
      status: 404,
      message: "No task at the moment",
    });
  }

  return res.status(201).json({
    status: 201,
    allTasks,
    message: "All task fetched successfully",
  });
}

async function createTodo(req, res) {
  const { title, description, status, priority } = req.body;

  if (!title) {
    return res.status(403).json({
      status: 403,
      message: "Task title required",
    });
  }

  const task = await Todo.create({
    title,
    description,
    status,
    priority,
  });

  if (!task) {
    return res.status(404).json({
      status: 404,
      message: "Error creating task",
    });
  }

  return res.status(201).json({
    status: 201,
    task,
    message: "Task created successfully",
  });
}

async function updateTask(req, res) {
  const { _id, status, title, description, priority } = req.body;

  if (!_id) {
    return res.status(403).json({
      status: 403,
      message: "Please provide task Id to update",
    });
  }

  const validTask = await Todo.findById(_id);

  if (!validTask) {
    return res.status(403).json({
      status: 403,
      message: "task not valid",
    });
  }

  //   console.log(status, title, description, priority);

  const updatedTask = await Todo.findByIdAndUpdate(_id, {
    status: status || validTask.status,
    title: title || validTask.title,
    description: description || validTask.description,
    priority: priority || validTask.priority,
  });

  if (!updatedTask) {
    return res.status(403).json({
      status: 403,
      message: "Error creating task",
    });
  }

  return res.status(200).json({
    status: 200,
    updatedTask,
    message: "Task updated successfully",
  });
}

async function deleteTodo(req, res) {
  const { id } = req.params;

  const deletedTask = await Todo.findByIdAndDelete(id);

  if (!deletedTask) {
    return res.status(403).json({
      status: 403,
      message: "task not valid",
    });
  }

  console.log(id);
  return res.status(200).json({
    status: 200,
    message: "Task deleted successfully",
  });
}

export { getAllTodos, createTodo, updateTask, deleteTodo };
