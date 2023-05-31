import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: { type: String },
        image: { type: String, default: "https://res.cloudinary.com/dxyregqsx/image/upload/v1683816464/folder_img/demo-image-default_sssopf.jpg" },
        sector: { type: String },
        address: { type: String },
        tags: [String],
        description:{ type: String },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
        likes: [{type: mongoose.Schema.Types.ObjectId, ref: "user"}],
        // crear seccion de commentarios...
        // crear sección de likes como un arra de ids---
        postDate: {
            type: Date,
            default:Date.now
        }
  }, { timestamps: true } 
);
// me falta el autor del graffitti!!!!!!!!!

const PostModel = mongoose.model("post", postSchema);

export default PostModel