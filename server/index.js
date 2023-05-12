import express from "express";
import mongoose from "mongoose";
import cloudinaryConfig from "./config/cloudinary.js";
import * as dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/userRoutes.js";
import petRouter from "./routes/petRoutes.js";
import cors from "cors";
import passportConfig from "./config/passport.js";

const app = express();
const port = process.env.PORT || 5001;

const setMiddlewares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
  cloudinaryConfig();
  passportConfig();
};

const connectMongoose = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      app.listen(port, () => {
        console.log(
          "Connection to MongoDB established, and server is running on port " +
          port
        );
      });
    })
    .catch((err) => console.log(err));
};

const connectRoutes = () => {
  app.use('/api/users', userRouter);
  app.use('/api/pets', petRouter);
  app.use('*', (req, res) => { res.status(500).json({ error: "Endpoint not found" }) });
};

setMiddlewares();
connectMongoose();
connectRoutes();


// si en algún momento se llega a colapsar el PORT... se utiliza en la terminal en la carppta server el siguiente comando... npx kill-port (puerto deseado)... 
// hay que esperar pero funciona...

// export {setMiddlewares, connectMongoose, connectRoutes}


// app.listen(port, () => {
//   console.log("Server is running on port" + port);
// });  


// const helloFunction = (req, res) => {
//   res.send({message: 'Hello World!', example: [1, 2, 3, 4, 5]})
// }
 
// app.post('/test',(req, res) => {
//   res.send({message: 'Hello World!', example: [1, 2, 3, 4, 5]})
// } );

// Anotaciones...
// con nodemon se puede reinicializar la terminal automaticamente para ver los resultados en tiempo real... npm start ... 
//  con el "type" module se puede hace import de los packages sin necesidad de hacer un required! // const express = require('express')
// hay que tener en cuenta esto para no cometer errores en el futuro 

