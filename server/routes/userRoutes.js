import express from "express";
import { testingRoute, getUsers, getUser, createUser, updateUser, login, getActiveUser } from "../controllers/userControllers.js";
import { multerUpload } from "../middlewares/multer.js";
import jwtAuth from "../middlewares/jwtAuth.js";

// const express = require('express')

// thi is the router 
const userRouter = express.Router();
// endpoints to look for users
userRouter.get("/test", testingRoute);  
userRouter.get("/all", getUsers);
userRouter.get("/id/:id", getUser);
userRouter.get("/active",jwtAuth , getActiveUser);

// endpoints to create and update images from thwe user...?...
userRouter.post("/new", multerUpload.single("avatar"), createUser);
userRouter.post("/update", jwtAuth, multerUpload.single("avatar"), updateUser);
// this is with form data.... postman!!!
userRouter.post("/login",  login);




 

export default userRouter

// Con el export dafault significa que uno esta exportando solo una vez. cuando se exportan más cosas se hace con 
// {userRouter, otraCosa, etc... }  
// los dos puntos en antes del id significan que ese id v aa ser flexible...
// si uno quiere utilizar algo lo tiene que exportar y despußes importar... suena chistoso pero es una practica que se tiene que hacer todo el tiempo... CUIDADO!!!