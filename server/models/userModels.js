import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String },
    username: { type: String },
    password: { type: String, required: true },
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "pet" }],
    avatar: { type: String, default: "https://res.cloudinary.com/dxyregqsx/image/upload/v1682681502/user_avatars/placeholder_gik52p.png" },
    about: { type: String, default: "tell us something about you..." },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
    favourites: [{type: mongoose.Schema.Types.ObjectId, ref: "post" }]
    // La  subcollection tiene que ser singular...
  }, { timestamps: true }
);
// linea 9: la funcion default es para poner una imagen en caso de que no se cree o se suba ninguna imagen...

const UserModel = mongoose.model("user", userSchema);

export default UserModel

// para encontrar las colleciones de mongoose hay que ponerle cuidado a NO escribir las s en los prurales... porque? porque la misma app se encarga de encontrarlo...

// este es solo un modelo de ocmo pude verse una aplicación de mongoose... la estructura de la base de dato que vamos a crear se puede ver en 
// la pagina de mongoose... así que tengo qeu pensar cual es la estructura de la base dedatos que tengo qeu crear 
//  con el timestamp... se actualiza la hora/fecha de cada objeto cada vezq eu se hace unaa actualización para crear un registro 

// Aquí se peuden algunas estructuras que se pueden crear...   https://mongoosejs.com/docs/guide.html
// Linea 8: my user can have multiple pets so it has to be an array