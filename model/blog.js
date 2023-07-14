import mongoose from "mongoose";

const blogSchema =  mongoose.Schema ({
    userId:{
        type: mongoose.Types.ObjectId,
        ref:"users",
        required:true,
    },
    category:{
        type: String,
        required:true,
    },
    title:{
        type: String,
        required:true,
    },
    description:{
        type: String,
        required:true,
    },
    image:{
        type: String,
        required:true,
    },
},
{ timestamps: true }
);
var blogModel = mongoose.model("blog",blogSchema)
export default blogModel;