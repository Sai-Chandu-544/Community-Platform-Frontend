import { useEffect, useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../auth/auth";
import { useNavigate } from "react-router-dom";

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  const isLoggedIn = !!token;

  const navigate=useNavigate()

  const fetchPosts = async () => {
  try {
    const response = await fetch("https://community-platform-backend-h293.onrender.com/user/allposts",{
      headers: {
    Authorization: `Bearer ${token}`,  
  },
    });
    const data = await response.json();

   

    setLoading(false);

    if (response.ok ) {
      setPosts(data);
    } else {
      toast.error("Unexpected response format");
     
    }
  } catch (error) {
    console.error("Fetch error:", error);
    toast.error("Server error. Please try again.");
  
    setLoading(false);
  }
};


  useEffect(() => {
     if (!isLoggedIn) {
      navigate("/login");
    }
      fetchPosts();
  }, [isLoggedIn,navigate]);

  return (
   <main className="max-w-4xl mx-auto px-4 py-8">
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">All Posts</h1>
    
{ loading ? (
      <>
      <div className="absolute inset-0 bg-white/70 z-50 flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-600 mt-2">Loading profiles...</p>
          </div>
      </>
    ) : posts.length === 0 ? (
      <p className="text-gray-600">No posts available.</p>
    ) : (
      <div className="space-y-4">
        {posts.map((post, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded border border-gray-200 shadow-sm">
            <h2 className="font-semibold text-blue-600">
              {post.author?.name || post.author?.email || "Unknown User"}
            </h2>
            <p className="text-gray-800 mt-1">
              {post.content || post.text || "No content"}
            </p>
            <p className="text-sm text-gray-500 text-right">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    )}
  </div>

  <ToastContainer position="top-right" autoClose={3000} className="mt-12" />
</main>

  );
};
