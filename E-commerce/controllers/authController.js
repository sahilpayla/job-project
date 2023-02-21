import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelpers.js";

export const registerController = async (req, res) => {
   try {
      const { name, email, password, address, phone } = req.body;
      // validation
      if (!name) {
         return res.send({ error: "name is required" })
      }
      if (!email) {
         return res.send({ error: "email is required" })
      }
      if (!password) {
         return res.send({ error: "password is required" })
      }
      if (!address) {
         return res.send({ error: "address is required" })
      }
      if (!phone) {
         return res.send({ error: "phone is required" })
      }

      // already a user 
      const alreadyUser = await userModel.findOne({ email })
      if (alreadyUser) {
         return res.status(200).send({
            success: true,
            message: "Already Account Created!! Please Login",
         })
      }

      const hashedPassword = await hashPassword(password);
      //save
      const user = await new userModel({
         name, email, phone, address, password: hashedPassword,
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