
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useState,useEffect,useContext } from "react";

import { AuthContext } from "../auth/auth";





export const HomePage=()=>{
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {token}=useContext(AuthContext)
  useEffect(() => {
      setIsLoggedIn(!!token);
      
    }, [token]);
  
  return (
    
    <>
   
   
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
   
      
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="desktop:text-4xl mobile:text-[25px] font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">HireMe</span>
          </h1>
          <p className="desktop:text-xl text-gray-600 max-w-3xl mx-auto mb-8 mobile:max-w-2xl mobile:text-[15px]">
            Connect with professionals, share your insights, and build your career. 
            Join a community of like-minded individuals passionate about growth and success.
          </p>
          <div className="flex justify-center space-x-4">
           {!isLoggedIn && <Link to="/register" className="bg-blue-600 text-white px-8 py-3 mobile:px-2 mobile-py-1 mobile:text-[10px] rounded-lg  font-semibold text-lg hover:bg-blue-700 transition duration-200 cursor-pointer whitespace-nowrap ">
              Join Today
            </Link>} 
           
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-user-line text-2xl text-blue-600"></i>
            </div>
            <h3 className="desktop:text-xl mobile:text-[12px] font-semibold text-gray-900 mb-2">Build Your Profile</h3>
            <p className="text-gray-600 mobile:text-[10px]">Create a professional profile that showcases your skills, experience, and achievements.</p>
          </div>

          <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-chat-3-line text-2xl text-green-600"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 mobile:text-[12px]">Share & Engage</h3>
            <p className="text-gray-600  mobile:text-[10px]">Share your professional insights and engage with posts from other industry professionals.</p>
          </div>

          <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-group-line text-2xl text-purple-600"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 mobile:text-[12px]">Grow Your Network</h3>
            <p className="text-gray-600  mobile:text-[10px]">Connect with professionals in your field and expand your professional network.</p>
          </div>
        </div>
{
  !isLoggedIn && <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 mobile:text-[12px]">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-6 mobile:text-[10px]">Join thousands of professionals who are already building their networks and sharing their expertise.</p>
          <Link to="/register" className="bg-blue-600 text-white px-8 py-3 mobile:text-[10px]  rounded-lg font-semibold hover:bg-blue-700 transition duration-200 cursor-pointer whitespace-nowrap">
            Create Your Account
          </Link>
        </div>
}
        
      </main>
    </div>
     </>
  );
}
