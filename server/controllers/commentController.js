import commentModel from "../models/commentModel.js"
import PostModel from "../models/postModel.js";

const getAllComments = async (req, res) => {
    try {
        const comment = await commentModel.find().populate({ path: "author", select: ["username"] })
        .populate({ path: "post", select: ["title"]})

        res.status(200).json(comment)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "comments no found, please try again" })
    }
};

const addCommentToPost = async (postId, sharedComment) => {
    try {
        const result = await PostModel.findByIdAndUpdate(postId,
            { $push: { comments: sharedComment._id } },
            { new: true }
        )
        console.log("user making comments...", result);
        return true
    } catch (error) {
        console.log(error)
        return false
    }
};


const createComment = async (req, res) => {
    const newComment = new commentModel({
        ...req.body
    });
     console.log("es el body de los comentarios????????", req.body)
    try {
        const sharedComment = await newComment.save();
        const postUpdated = await addCommentToPost(req.body.post, sharedComment)
        console.log("comentario", req.body.post)
        res.status(200).json({
            update_status: postUpdated,
            message: "lograste crear un commentario!!",
            newComment: sharedComment
        })

    } catch (error) {
        console.log(error);
        res.status(500).json("salió mal el comment...")
    }
};

const deleteComment = async (req, res) => {
    try {
        const commentToDelete = await commentModel.findByIdAndDelete(req.body._id)
        console.log("comment deleted...", req.body._id)
        res.status(200).json(commentToDelete);
        console.log(commentToDelete)
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
};




export {getAllComments, createComment, deleteComment}