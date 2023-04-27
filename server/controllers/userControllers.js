import UserModel from "../models/userModels.js"


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
        res.status(500).json({error: "algo salió mal..."})
        
    }
}

const createUser = async (req, res) => {
    console.log(req.body);
    const newUser = new UserModel({
        ...req.body
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
}

const updateUser = async (req, res) => {
    try {
        const updateUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // when I update to false, will send me the old version as a response...
        res.status(200).json(updateUser);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

export { testingRoute, getUsers, getUser, createUser, updateUser }

//  si uno hace un cosole.log del req, se puede ver todas las propiedades del objeto
//  con la funcion find. algo, se puede hacer una variedad de cosas con el fin by...
// linea 33: poner cuidado si se quieren adherir más cosas al array se tiene que especificar, por ejemplo: 
// pets:[pet1, pet2, pet3]
