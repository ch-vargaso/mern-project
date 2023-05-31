import UserModel from "../models/userModels.js"
import { encryptPassword, verifyPassword } from "../utils/bcrypt.js";
import { imageUpload } from "../utils/imageManagement.js";
import { generateToken } from "../utils/jwt.js";


const testingRoute = (req, res) => {
    res.send('testing users route...')
};

const getUsers = async (req, res) => {
    try {
        
        const users = await UserModel.find().populate({
            path: 'posts',
            populate: {
                path: 'comments',
                populate: {
                    path: 'author', select: ['username']
                }
            }
        })
            .populate({
                path: 'pets',
                populate:{path: 'owner', select: ['username']}
            })
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: "something went wrong..."})
        console.log(error);
    }
}

const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        // const user = await UserModel.findById(id).populate({ path: "pets", select: ["name", "animal"] });
        const user = await UserModel.findById(id).populate({
            path: 'pets',
            populate: {
                path: 'owner', select: ['username']
            }
        })
            .populate({
                path: 'posts',
                populate: [
                    {path: 'author', select: ['username'] },
                    {path: 'comments'}
                ]
            });
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "algo salió mal con getUser en el controller..." })
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
        //1. comprobar que el usuario no esta en la DB ... const exisitingUser =User.Model.find({email: req.body.email})
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
    console.log("user", req.user)
    console.log("user body", req.body)

    const propertiestoUpdate = { ...req.body }
    try {
        if (req.file) {
            const updateAvatar = await imageUpload(req.file, "user_avatars");
            propertiestoUpdate.avatar = updateAvatar
        }
        if (req.body.password) {
            const encryptedPassword = await encryptPassword(req.body.password);
            propertiestoUpdate.password = encryptedPassword
        }
        console.log(propertiestoUpdate);
        const updateUser = await UserModel.findByIdAndUpdate(req.user._id, propertiestoUpdate, { new: true });
        // when I update to false, will send me the old version as a response...
        res.status(200).json(updateUser);
        console.log(updateUser);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};

const deleteUser = async (req, res) => {
    console.log
}
// make different checks (express validator.. google... ) 

// finBYID... se usa cuando uno tiene algún id??? leer lo de la documentación...
const login = async (req, res) => {
    try {
        const existingUser = await UserModel.findOne({ email: req.body.email })
              .populate({
                path: "posts",
                populate: [
                    { path: 'author', select: ['username'] },
                    {
                        path: 'comments',
                        populate: {
                            path: 'author', select: ['username']
                        }
                    }
                ]
              })
            .populate({
                path: "favourites",
                populate: [
                    { path: 'author', select: ['username'] },
                    {
                        path: 'comments',
                        populate: {
                            path: 'author', select: ['username']
                        }
                    }
            
                ]
            
        })
        
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
                        name: existingUser.name,
                        username: existingUser.username,
                        pets: existingUser.pets,
                        avatar: existingUser.avatar,
                        about: existingUser.about,
                        posts: existingUser.posts,
                        favourites:existingUser.favourites
                    }
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "something went wrong... not autentified..." })
    }
};

const getActiveUser = async (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        username: req.user.username,
        avatar: req.user.avatar,
        pets: req.user.pets,
        about: req.user.about,
        posts: req.user.posts,
        favourites: req.user.favourites
    });
};


export { testingRoute, getUsers, getUser, createUser, updateUser, login, getActiveUser }

//  si uno hace un cosole.log del req, se puede ver todas las propiedades del objeto
//  con la funcion find. algo, se puede hacer una variedad de cosas con el fin by...
// linea 33: poner cuidado si se quieren adherir más cosas al array se tiene que especificar, por ejemplo: 
// pets:[pet1, pet2, pet3]
//  para borrar imagenes se necesita el public id del elemento....  
//  Se puede crear un folder para cada user...