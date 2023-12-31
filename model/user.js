import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    blogs: [{
        type: mongoose.Types.ObjectId,
        ref: "blog",
        required: true
    }]
})

const userModel = mongoose.model('users', userSchema);
export default userModel