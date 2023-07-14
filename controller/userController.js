import userModel from '../model/user.js'


export const getAllUsers = async(req,res,next)=>{
    let Users
    try {
        Users = await userModel.find()
    } catch (error) {
        console.log(error)
    }
    if(!Users){
        return res.status(404).json({msg:"No User Found"})
    }
    return res.status(200).json({Users})

}