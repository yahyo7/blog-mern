import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://images.freeimages.com/images/large-previews/699/blog-1-1241898.jpg?fmt=webp&w=500",
  },
  category: {
    type: String,
    default: "uncategorized",
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  
}, {timestamps: true});

// post model
const Post = mongoose.model("Post", postSchema);
export default Post