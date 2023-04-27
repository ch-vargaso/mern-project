import PetModel from "../models/petModel.js"

const getAllPets = async (req, res) => {
    try {
        const pet = await PetModel.find().populate({ path:"owner", select:["username", "email"] });
        res.status(200).json(pet);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "please try again..."}) 
    }
}

export default getAllPets

// linea 5: cuando uno selecciona select---- se escoge la información que uno quiere mostrar en el json... esto es una opción de mongoose...