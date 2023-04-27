import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        animal: { type: String, required: true },
        password: { type: String, required: true },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
    
  }, { timestamps: true } 
);

const PetModel = mongoose.model("pet", petSchema);

export default PetModel