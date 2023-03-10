import React, { useState } from 'react'
import { Box, AppBar, Toolbar, Button, Typography, Tabs, Tab } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../redux/store';



export const Header = () => {
   // global state
   const isLogin = useSelector(state => state.isLogin)
   const dispatch = useDispatch();
   const navigate = useNavigate();


   // normal state
   const [value, setValue] = useState()

   // 
   const handleLogout = () => {
      try {
         dispatch(authActions.logout())
         alert("Logout successfully")
         navigate('/login')
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <>
         <AppBar position="sticky">
            <Toolbar>
               <Typography variant='h4'>
                  <Link to='/'>Blog App</Link>
               </Typography>
               {isLogin && (
                  <Box display={'flex'} marginLeft={"auto"} marginRight={"auto"} >
                     <Tabs textColor="inherit" values={value} onChange={(e, val) => setValue(val)}>
                        <Tab label="Blogs" LinkComponent={Link} to="/blog" />
                        <Tab label="My Blogs" LinkComponent={Link} to="/my-blog" />
                     </Tabs>
                  </Box>)
               }
               <Box display={'flex'} marginLeft={"auto"}>
                  {!isLogin && (
                     <>
                        <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/login">Login</Button>
                        <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/register">Register</Button>
                     </>
                  )}
                  {isLogin && (
                     <Button onClick={handleLogout}
                        sx={{ margin: 1, color: 'white' }} >Logout</Button>)}
               </Box>
            </Toolbar>
         </AppBar>
      </>
   )
}