import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';


const Register = () => {


   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [phone, setPhone] = useState('')
   const [address, setAddress] = useState('')
   const [answer, setAnswer] = useState('')

   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const res = await axios.post(
            "/api/v1/auth/register",
            { name, email, password, phone, address, answer }
         );
         if (res && res.data.success) {
            toast.success(res.data && res.data.message)
            navigate("/login");
         } else {
            toast.error(res.data.message)
         }
         e.preventDefault();
      } catch (error) {
         console.log(error.message)
      }
   }
   // console.log(process.env.REACT_APP_API)
   return (
      <Layout>
         <div className="register">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
               <div className="form-group">
                  <input type="text"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     required
                     className="form-control" id="exampleInputName" placeholder="Enter name" />
               </div>

               <div className="form-group">
                  <input type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                     className="form-control" id="exampleInputEmail" placeholder="Enter Email" />
               </div>

               <div className="form-group">
                  <input type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                     className="form-control" id="exampleInputPassword1" placeholder="Password" />
               </div>

               <div className="form-group">
                  <input type="text"
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                     required
                     className="form-control" id="exampleInputPhone" placeholder="Enter Phone" />
               </div>

               <div className="form-group">
                  <input type="text"
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                     required
                     className="form-control" id="exampleInputAddress" placeholder="Enter Address" />
               </div>

               <div className="form-group">
                  <input type="text"
                     value={answer}
                     onChange={(e) => setAnswer(e.target.value)}
                     required
                     className="form-control" id="exampleInputAnswer" placeholder="What is Best Movie" />
               </div>

               <button type="submit" className="btn btn-primary">Sign In</button>
            </form>
         </div>

      </Layout>
   )
}

export default Register