import PostModel from "../models/postModel.js";
import UserModel from "../models/userModels.js";
import { encryptPassword } from "../utils/bcrypt.js";
import { imageUpload } from "../utils/imageManagement.js";

const getAllPosts = async (req, res) => {
    try {
        const post = await PostModel.find()
            .populate({ path: "author", select: ["username"] })
            .populate({ path: "likes", select: ["username"] })  
            .populate({
                path: "comments",
                populate: [
                    { path: 'author', select: ['username'] }]
            })
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "please try again...vamos funcionando..." })
    }
};

const createPost = async (req, res) => {
    // console.log("whole body", req.body)
    // console.log(req.user);
    // esto lo creo para que las perosnas tengan obligación de crear un post solo con graffitis
    // if (!req.body.title || !req.body.sector || !req.body.description) {
    //     return res.status(406).json({ error: "por favor completa los campos del post :) " })
    //     // esto puede ser una alerta o un modal en el futuro...
    // }
    const postImg = await imageUpload(req.file, "user_post_img");
    // console.log("imagen para el post", postImg);
    const newPost = new PostModel({
        ...req.body,
        image: postImg
    });
    try {
        const sharedPost = await newPost.save();
        const userUpdated = await addPostToUser(req.body.author, sharedPost);
        console.log("AUTHOR del post", req.body.author)
        res.status(200).json({
            update_status: userUpdated,
            message: "Siiiiiiii lograste crear un post!!!!! ",
            newPost: sharedPost
        })

    } catch (error) {
        console.log(error);
        res.status(500).json("salió mal, pero vamos a lograrlo!!!")
    }
};

const addPostToUser = async (userId, sharedPost) => {
    try {

        const result = await UserModel.findByIdAndUpdate(userId,
            { $push: { posts: sharedPost._id } },
            { new: true }
        )
        console.log("user making post....", result);
        return true
    } catch (error) {
        console.log(error)
        return false
    }   
};

const updatePost = async (req, res) => {
    console.log("post", req.user.posts)
    // console.log("post body", req.body)
    const propertiestoUpdate = { ...req.body }
    try {
        if (req.file) {
            const updatePostImg = await imageUpload(req.file, "user_post_img");
            propertiestoUpdate.image = updatePostImg
        }
        console.log(propertiestoUpdate);
        const updatePost = await PostModel.findByIdAndUpdate(req.body._id, propertiestoUpdate, { new: true });
        console.log("post updated", req.body._id)
        res.status(200).json(updatePost);
        console.log(updatePost);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};

const addLike = async (req, res) => {
    // console.log('req.body :>> ', req.body);
    // console.log('req.user :>> ', req.user);

    try {
        const like = await PostModel.findByIdAndUpdate(req.body.postId,
            { $push: { likes: req.user._id } },
            { new: true}
        )
        const addToFavourites = await UserModel.findByIdAndUpdate(req.user._id,
            { $push: { favourites: req.body.postId } },
            {new: true}
        )
        console.log("user giving a like to a post...", like)
        return res.status(200).json(req.user.favourites)
    } catch (error) {
        res.status(500).json({ error: "something went wrong"})
    }
}
const deleteLike = async (req, res) => {
    console.log('req.body :>> ', req.body);
    console.log('req.user :>> ', req.user);

    try {
        const unlike = await PostModel.findByIdAndUpdate(req.body.postId,
            { $pull: { likes: req.user._id } },
            { new: true}
        )
        const addToFavourites = await UserModel.findByIdAndUpdate(req.user._id,
            { $pull: { favourites: req.body.postId } },
            {new: true}
        )
        console.log("user deleting a like from a post...", unlike)
        return res.status(200).json("unliked")
    } catch (error) {
        res.status(500).json({ error: "something went wrong"})
    }
}


const deletePost = async (req, res) => {
    console.log("post", req.user.posts)
    try {
        const postToDelete = await PostModel.findByIdAndDelete(req.body._id)
        console.log("post deleted...", req.body._id)
        res.status(200).json(postToDelete);
        console.log(postToDelete)
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};

export  {getAllPosts, createPost, updatePost, addLike, deleteLike, deletePost}
// linea 5: cuando uno selecciona select---- se escoge la información que uno quiere mostrar en el json... esto es una opción de mongoose...