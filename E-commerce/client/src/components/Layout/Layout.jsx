import React from 'react'
import Footer from './Footer'
import Header from './Header'
import { Toaster } from 'react-hot-toast';


const Layout = ({ children }) => {
   return (
      <div>
         <Header />
         <main style={{ minHeight: "60vh" }}>{children} </main>
         <Toaster />
         <Footer />
      </div>
   )
}

export default Layout