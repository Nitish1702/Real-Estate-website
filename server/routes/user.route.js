// routes/user.js
import express from "express";
import { addUser, getUser, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

// Route to add a new user
router.post("/adduser", addUser);

// Route to get all users or a specific user by ID
router.get("/getuser/:id?", getUser);

// Route to update a user by ID
router.put("/updateuser/:id", updateUser);

// Route to delete a user by ID
router.delete("/deleteuser/:id", deleteUser);

export default router;
