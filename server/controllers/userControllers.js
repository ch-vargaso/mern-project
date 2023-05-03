import UserModel from "../models/userModels.js"
import { encryptPassword, verifyPassword } from "../utils/bcrypt.js";
import { imageUpload } from "../utils/imageManagement.js";
import { generateToken } from "../utils/jwt.js";


const testingRoute = (req, res) => {
    res.send('testing users route...')
};

const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({error: "something went wrong..."})
        console.log(e);
    }
}

const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModel.findById(id).populate("pets");
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "algo salió mal..." })
        
    }
};

const createUser = async (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.username) {
        return res.status(406).json({ error: "por favor llene todos los campos..." })
    }
    const avatar = await imageUpload(req.file, "user_avatars");
    const encryptedPassword = await encryptPassword(req.body.password);
    console.log("avatar", avatar);
    //   new user with encrypted password created!!!! yuhuuuuuuu!!!!!
    const newUser = new UserModel({
        ...req.body,
        password: encryptedPassword, 
        avatar: avatar
    });
    try {
        const registeredUser = await newUser.save();
        res.status(200).json({
            message: "por fin te registraste!!... desde el server",
            newUser: registeredUser
            // Aquí de pronto no es bueno enviar nada... o el username, quizás...
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("salió mal, please try again...")
    }
};

const updateUser = async (req, res) => {
    try {
        const updateUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // when I update to false, will send me the old version as a response...
        res.status(200).json(updateUser);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};

// finBYID... se usa cuando uno tiene algún id??? leer lo de la documentación...
const login = async (req, res) => {
    try {
        const existingUser = await UserModel.findOne({ email: req.body.email });
        // verifyPassword(req.body.password, existingUser.password);
        if (!existingUser) {
            res.status(404).json({ error: "no se encontró ningún usuario..." })
            return;
        }
        if (existingUser) {
            const verified = await verifyPassword(req.body.password, existingUser.password);
            if (!verified) {
                res.status(401).json({ error: "password doesn't match..." })
            }
            if (verified) {
                const token = generateToken(existingUser);
                res.status(200).json({
                    verified: true,
                    token: token,
                    user: {
                        _id: existingUser._id,
                        username: existingUser.username,
                        pets: existingUser.pets,
                        avatar: existingUser.avatar
                    }
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong... not autentified..." })
    }
};


export { testingRoute, getUsers, getUser, createUser, updateUser, login }

//  si uno hace un cosole.log del req, se puede ver todas las propiedades del objeto
//  con la funcion find. algo, se puede hacer una variedad de cosas con el fin by...
// linea 33: poner cuidado si se quieren adherir más cosas al array se tiene que especificar, por ejemplo: 
// pets:[pet1, pet2, pet3]
//  para borrar imagenes se necesita el public id del elemento....  
//  Se puede crear un folder para cada user...