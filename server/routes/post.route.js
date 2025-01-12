import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  updatePost,
} from "../controllers/post.controller.js";
import upload from '../config/multerConfig.js'
const router = express.Router();

router.post("/addpost", upload.array("pictures", 10), addPost);
router.get("/getpost", getPost);
router.post("/updatepost", updatePost);
router.post("/deletepost", deletePost);

export default router;
