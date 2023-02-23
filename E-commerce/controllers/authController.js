import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelpers.js";
import JWT from 'jsonwebtoken';


export const registerController = async (req, res) => {
   try {
      const { name, email, password, address, phone,answer } = req.body;
      // validation
      if (!name) {
         return res.send({ message: "name is required" })
      }
      if (!email) {
         return res.send({ message: "email is required" })
      }
      if (!password) {
         return res.send({ message: "password is required" })
      }
      if (!address) {
         return res.send({ message: "address is required" })
      }
      if (!phone) {
         return res.send({ message: "phone is required" })
      }
      if (!answer) {
         return res.send({ message: "answer is required" })
      }

      // already a user 
      const alreadyUser = await userModel.findOne({ email })
      if (alreadyUser) {
         return res.status(200).send({
            success: false,
            message: "Already Account Created!! Please Login",
         })
      }

      const hashedPassword = await hashPassword(password);
      //save
      const user = await new userModel({
         name, 
         email, 
         phone, 
         address, 
         password: hashedPassword,
         answer
      }).save();

      res.status(201).send({
         success: true, message: "User Register Successfully", user,
      });

   }
   catch (error) {
      console.log(error.message);
      res.status(500).send({
         success: false, message: "Error in Register", error
      })
   }
}

export const loginController = async (req, res) => {
   try {
      const { email, password } = req.body;
      if (!email || !password) {
         return res.status(404).send({
            success: false,
            message: "Invalid email or password",
         });
      }
      //check user
      const user = await userModel.findOne({ email });
      if (!user) {
         return res.status(404).send({
            success: false,
            message: "Email is not registerd",
         });
      }
      const match = await comparePassword(password, user.password);
      if (!match) {
         return res.status(200).send({
            success: false,
            message: "Invalid Password",
         });
      }

      //token
      const token = await JWT.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "7d", });

      res.status(200).send({
         success: true,
         message: "login successfully",
         user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            adddress: user.address,
         },
         token,
      });
   }
   catch (error) {
      console.log(error.message);
      res.status(500).send({
         success: false, message: "Error in Login", error
      })
   }
}

// forgot password
export const forgotPasswordController = async (req, res) => {
   try {
      const {email, answer , newPassword} = req.body;
      if (!email) {
         return res.send({ message: "email is required" })
      }
      if (!answer) {
         return res.send({ message: "Answer is required" })
      }
      if (!newPassword) {
         return res.send({ message: "New Password is required" })
      }

      // check
      const user = await userModel.findOne({email, answer})
      // validation
      if(!user){
         return res.status(404).send({
            success: false,
            message: 'Wrong Credentials'
         })
      }

      const hashed = await hashPassword(newPassword)
      await userModel.findByIdAndUpdate(user._id, {password:hashed})

      res.status(200).send({
         success:true, 
         message: 'Password Change successfully'
      })
   }
   catch (error) {
      console.log(error.message)
      res.status(500).send({ success: false, message: "Something went wrong", error })
   }
}



// test controller
export const testController = (req, res) => {
   res.send('protected routes')
}