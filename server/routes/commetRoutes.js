import express from "express";
import commentModel from "../models/commentModel.js";
import { testingRoute } from "../controllers/userControllers.js";
import jwtAuth from "../middlewares/jwtAuth.js";
import { createComment, deleteComment, getAllComments } from "../controllers/commentController.js";


const commentRouter = express.Router();

// endpoints to get the comments...  

commentRouter.get("/test", testingRoute)
commentRouter.get("/all", getAllComments)

// endpoints to upload the comments...  
commentRouter.post("/new", jwtAuth, createComment);
commentRouter.post("/delete", jwtAuth, deleteComment);


// FALTA FUNCION DE UPDATE????

export default commentRouter


