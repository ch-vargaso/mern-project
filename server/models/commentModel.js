import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        post:{type:mongoose.Schema.Types.ObjectId, ref: "post"},
        text: { type: String },

    }, { timestamps: true }
);

const commentModel = mongoose.model("comments", commentSchema);

export default commentModel