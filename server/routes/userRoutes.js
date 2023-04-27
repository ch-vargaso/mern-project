import express from "express";
import { testingRoute, getUsers, getUser } from "../controllers/userControllers.js";

// const express = require('express')
const userRouter = express.Router();

userRouter.get("/test", testingRoute);  
userRouter.get("/all", getUsers);
userRouter.get("/id/:id", getUser)
 

export default userRouter

// Con el export dafault significa que uno esta exportando solo una vez. cuando se exportan más cosas se hace con 
// {userRouter, otraCosa, etc... }  
// los dos puntos en antes del id significan que ese id v aa ser flexible...
// si uno quiere utilizar algo lo tiene que exportar y despußes importar... suena chistoso pero es una practica que se tiene que hacer todo el tiempo... CUIDADO!!!