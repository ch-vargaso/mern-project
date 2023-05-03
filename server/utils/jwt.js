import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
dotenv.config();

const generateToken = (existingUser) => {
    const payload = {
        sub: existingUser._id,
        msg: "funcionando!! creating token..."
    }
    const options = {
        expiresIn: "7d",
        // se puede cambiar el tiempo de expiración (ver documentación)
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, options);
    return token
};
 
export { generateToken }
// se importó sin el default porque es posible que creemos más tokens...