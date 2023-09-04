import userModel from '../model/user.js'
import pkg from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signUpUser = async (req, res, next) => {
    try {
        console.log(req.body, '-----signUp---here');
        const { name, email, password } = req.body;
        console.log(name);
        let existingUser;
        existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User Already Exists" });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(password, salt);
            console.log(hashedPass, 'hashedPass');
            const saveUser = new userModel({ name, email, password: hashedPass, blogs: [] });
            await saveUser.save();
            const { password, createdAt, updatedAt, __v, ...others } = saveUser._doc
            console.log(saveUser, '---saveUser');
            // T O K E N
            const jwt = pkg
            const token = jwt.sign(
                {
                    email: saveUser.email,
                    id: saveUser._id,
                },
                process.env.JWT_KEY,
                { expiresIn: "24h" }
            );
            console.log(saveUser, '------newUser');
            return res.status(200).json({ success: true, User: others, Token: token, message: 'SignUp Successful' });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error while SignUp' });
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body,'------body')
        const jwt = pkg;
        const User = await userModel.findOne({ email: email });
        if (User) {
            const validity = await bcrypt.compare(password, User.password);
            if (!validity) {
                return res.status(200).json({ message: "Wrong Email or Password", success: false });
            } else {
                const Token = jwt.sign(
                    {
                        email: User.email,
                        id: User._id,
                    },
                    process.env.JWT_KEY,
                    { expiresIn: "24h" }
                );
                const { password, createdAt, updatedAt, __v, ...others } = User._doc
                console.log(req.body, 'Login Success')
                return res.status(200).json({ User: others, Token, success: true, message: "Login Success" });
            }
        } else {
            return res.status(200).json({ message: "User does not Exist", success: false });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
