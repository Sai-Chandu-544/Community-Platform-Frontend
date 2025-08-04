import { Navbar } from "./Navbar"
import {Register} from './Register'
import {Login} from './Login'
import { HomePage } from "./HomePage";
import { Routes, Route } from 'react-router-dom';
import {PrivateRoute} from "../auth/privateRoute"
import { CreatePost } from "./Create_Post";
import {AllPosts} from './All_Posts'
import {MyPosts} from './My_Posts'



export const App=() =>{
 

  return (
    <>
    <Navbar/>
      <Routes>
        
        <Route path="/" element={<HomePage/>} />


      
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-post" element={<PrivateRoute><CreatePost/></PrivateRoute>} />
        <Route path="/allposts" element={<PrivateRoute><AllPosts /></PrivateRoute>} />
        <Route path="/myposts" element={<PrivateRoute><MyPosts /></PrivateRoute>} />

      </Routes>

      
    </>
  )
}


