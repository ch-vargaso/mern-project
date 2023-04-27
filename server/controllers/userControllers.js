import UserModel from "../models/userModels.js"


const testingRoute = (req, res) => {
    res.send('testing users route...')
};

const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({users});
    } catch (e) {
        res.status(500).json({error: "something went wrong..."})
        console.log(e);
    }
}

const getUser = async (req, res) => {
    const id = req.params.id; 
    try {
        const user = await UserModel.findById(id)
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "algo salió mal..."})
        
    }
}

export { testingRoute, getUsers, getUser }

//  si uno hace un cosole.log del req, se puede ver todas las propiedades del objeto
//  con la funcion find. algo, se puede hacer una variedad de cosas con el fin by...
