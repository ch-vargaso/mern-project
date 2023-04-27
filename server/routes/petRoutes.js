import express from "express";
import getAllPets from "../controllers/petController.js";

const petRouter = express.Router();

petRouter.get("/all", getAllPets);

export default petRouter