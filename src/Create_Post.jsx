import { useState, useEffect,useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../auth/auth";

export const CreatePost = () => {
  const [postText, setPostText] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn,setIsLoggedIn]=useState(false)

  const {token}=useContext(AuthContext)
 const mail = localStorage.getItem("User");
  useEffect(() => {
   
    setIsLoggedIn(!!token);
    setUserEmail(mail);
  }, [token,mail]);
   
    
    

  const handlePost = async () => {
    if (!postText.trim()) {
      toast.error("Post content cannot be empty.");
      return;
    }

    const url = "https://community-platform-backend-h293.onrender.com/user/post"; // ← Update to your actual post endpoint
    setLoading(true);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: postText, email: userEmail }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        toast.success("Post submitted successfully!");
        setPostText("");
      } else {
        toast.error(data.message || "Something went wrong. Try again.");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Internal Server Error");
    }
  };

  return (
    <>
     <ToastContainer
  position="top-right"
  autoClose={3000}
  style={{ marginTop: "80px" }} // Adjust value as needed
/>

      <div className="min-h-screen bg-blue-200 flex items-center justify-center px-4">
      <div className="desktop:w-full desktop:max-w-[50vw] mobile:w-full mobile:max-w-[80vw] bg-white p-8 rounded-xl shadow-md relative">
        {loading && (
          <div className="absolute inset-0 bg-white/60 z-50 flex flex-col items-center justify-center">
            <div className="spinner" />
            <div className="loading">Posting...</div>
          </div>
        )}

          <p className="font-bold text-2xl text-center mt-10 mobile:text-[15px]">Share an Update</p>

          <div className="bg-white p-4 rounded-lg shadow-md desktop:w-full mt-5 mobile:w-[65vw]">
            <div className="flex items-start gap-3 mb-3">
              <div className="desktop:w-10 desktop:h-10 mobile:w-5 mobile:5 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {userEmail ? userEmail.charAt(0).toUpperCase() : "U"}
              </div>
              <textarea
                className="flex-1 border border-gray-300 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Share your thoughts, achievements, or insights with your professional network"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
              />
            </div>

            <div className="flex justify-end border-t pt-3">
              <button
                onClick={handlePost}
                className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 text-sm"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
