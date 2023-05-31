import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import * as dotenv from "dotenv";
import UserModel from '../models/userModels.js';
dotenv.config();

const passportConfig = () => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    }
    const myStrategy = new JwtStrategy(opts, function (jwt_payload, done) {
        // try {
        //     const user = await UserModel.findById(jwt_payload.sub);
        //     return user ? done(null, user) : done(null, false);
        // } catch (error) {
        //     return done(error, false);
        // };
        // esto es en caso de async function, then we have to have async before the function...
        UserModel.findById(jwt_payload.sub)
     
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
                path: 'pets',
                populate: {
                    path: 'owner', select: ['username']
                }
            })
            .populate({
                path: 'favourites',
                populate: [
                { path: 'author', select: ['username'] },
                    { path: 'comments',
                        populate: {
                            path: 'author', select: ['username']
                        }
                    }
                
                ]
            })

            .then((user) => {
            return user ? done(null, user) : done(null, false);
        }).catch((error) => {
            return done(error, false);
        }) // this is an older version of JavaScript so it is safer and mongoose is in the actual version beta so it is better and consistent 
    })
    passport.use(myStrategy);
};

export default passportConfig

