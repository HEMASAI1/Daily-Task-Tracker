import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error("GET /tasks error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST create task
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }
    const task = await Task.create({ title: title.trim() });
    res.status(201).json(task);
  } catch (err) {
    console.error("POST /tasks error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH update status (pending <-> completed or set explicit status)
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body; // "pending" or "completed"

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (status === "pending" || status === "completed") {
      task.status = status;
    } else {
      // fallback: toggle if no valid status provided
      task.status = task.status === "pending" ? "completed" : "pending";
    }

    const saved = await task.save();
    res.status(200).json(saved);
  } catch (err) {
    console.error("PATCH /tasks/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE task
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("DELETE /tasks/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
