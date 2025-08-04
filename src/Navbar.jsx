import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../auth/auth";

export const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userEmail, setUserEmail] = useState("")

  const mail = localStorage.getItem("User")

  // console.log(userEmail)

   
  useEffect(() => {
    setIsLoggedIn(!!token);
    setUserEmail(mail)
  }, [token]);


  const handlelogout=()=>{
    logout()

  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 desktop:ml-20 mobile:ml-0">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <i className="ri-user-line text-white desktop:text-lg mobile:text-[12px]"></i>
            </div>
            <span className="text-xl font-bold text-gray-900 mobile:text-[12px]">HireMe</span>
          </div>

          {/* Navigation Links */}
          <nav className=" flex items-center desktop:space-x-8 mobile:space-x-1">
            <Link to="/" className="text-gray-600 mobile:text-[10px] mobile:ml-[20px] hover:text-blue-600 font-medium flex items-center space-x-1">
              <i className="ri-home-line"></i>
              <span>Home</span>
            </Link>
            <Link to="/allposts" className="text-gray-600 mobile:ml-2 mobile:text-[10px]  hover:text-blue-600 font-medium flex items-center space-x-1">
              <i className="ri-group-line"></i>
              <span>Public  Posts </span>
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center desktop:space-x-4 desktop:mr-25 mobile:space-x-1 mobile:mr-0 ">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium desktop:mr-10 mobile:mr-2 mobile:text-[10px] ">
                  Sign In
                </Link>
                <Link to="/register" className="bg-blue-600 text-white desktop:px-4 desktop:py-2  mobile:px-1 py-1 rounded-lg desktop:font-medium mobile:font-sans hover:bg-blue-700 transition mobile:text-[10px]">
                  Join Now
                </Link>
              </>
            ) : (
              <div className="relative flex mr-25 mobile:mr-5"> 
                {/* Create Post Button */}
                <Link to="/create-post" className="flex items-center mobile:w-[65px]   mobile:ml-8 desktop:space-x-2 mobile:space-x-1 bg-blue-600 text-white desktop:px-4  mobile:px-1 mobile:py-1 desktop:py-2  mobile:text-[8px] rounded-lg hover:bg-blue-700 transition">
                  <i className="ri-add-line"></i>
                  <span>Create Post</span>
                </Link>

                {/* Profile Avatar */}
                <button onClick={() => setShowUserMenu(!showUserMenu)} className=" desktop:ml-4 flex items-center mobile:ml-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm mobile:text-[10px]"> {userEmail ? userEmail.charAt(0).toUpperCase() : "U"}</span>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-10 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Signed in as</p>
                      <p className="text-sm text-gray-600 truncate">{userEmail}</p>
                    </div>
                    <div className="py-2">
                    
                      <Link to="/MyProfile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                        <i className="ri-profile-lin  mr-2"></i> Profile     
                      </Link>
                      {/* <Link to="/MyPosts" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                        <i className="ri-chat-1-line  mr-2"></i>My Posts   
                      </Link> */}
                      <button onClick={handlelogout} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50">
                        <i className="ri-logout-box-line mr-2"></i> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
