
import userModel from '../models/userModel.js'
import  JWT  from "jsonwebtoken"
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import { expressjwt as jwt } from "express-jwt";


//middleware


console.log("JWT_SECRET:", process.env.JWT_SECRET);

// const requireSingIn = jwt({
//     secret: process.env.JWT_SECRET,
//     algorithms: ["HS256"],
//   });
  

export const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({})
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: "All users are",
            users
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "SomeThing went Wrong",
            error
        })
    }
}
export const registerUserController = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "All the fields are required",
            })
        }

        // existingUSer
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Email already Registered please Login"
            })
        }
        const hashedPassword= await hashPassword(password)


        // save user
        const user = await new userModel({
            name, password: hashedPassword, email
        }).save()
        return res.status(201).send({
            success: true,
            message: "New User Created",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "SomeThing went Wrong",
            error
        })
    }
}
export const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Both Fields are required"
            })
        }

        const user= await userModel.findOne({email});
        if(!user){
            return res.status(200).send({
                success:false,
                message:"Email is not Registered"
            })
        }
      
       
    
        const match =await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Password"
            })
        }
      

        const token= await JWT.sign({_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'7d'},)

    
           user.password=undefined; 
        res.status(200).send({
            success:true,
            message:"Login Successful",
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "SomeThing went Wrong",
            error
        })
    }
}

export const updateUserController=async(req,res)=>{
    try {   
        const { name, password, email } = req.body;
        //user find
        const user = await userModel.findOne({ email });
       

        const hashedPassword = password ? await hashPassword(password) : undefined;
        //updated useer
        const updatedUser = await userModel.findOneAndUpdate(
          { email },
          {
            name: name || user.name,
            password: hashedPassword || user.password,
          },
          { new: true }
        );
        // updatedUser.password = undefined;
        res.status(200).send({
          success: true,
          message: "Profile Updated Please Login",
          updatedUser,
        });
        

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "SomeThing went Wrong",
            error
        })
    }

}