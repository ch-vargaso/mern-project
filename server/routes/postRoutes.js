import express from "express";
import {getAllPosts, createPost, updatePost, addLike, deleteLike, deletePost} from "../controllers/postController.js";
import { testingRoute, updateUser } from "../controllers/userControllers.js";
import { multerUpload } from "../middlewares/multer.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const postRouter = express.Router();

// endpoints to get the posts...
postRouter.get("/test", testingRoute)
postRouter.get("/all", getAllPosts);

// endpoint to upload a new post...
postRouter.post("/new", jwtAuth, multerUpload.single("image"), createPost);
postRouter.post("/update", jwtAuth, multerUpload.single("image"), updatePost)
postRouter.post("/like", jwtAuth, addLike)
postRouter.post("/unlike", jwtAuth, deleteLike)
postRouter.post("/delete", jwtAuth, deletePost)


// FALTA FUNCION DE UPDATE????


export default postRouter
