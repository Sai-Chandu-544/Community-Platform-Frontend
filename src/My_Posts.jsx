import { useEffect, useState, useContext } from "react";

import { toast } from "react-toastify";

export const MyPosts = () => {
   


  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

 const fetchMyPosts = async () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("UserId"); 

  

  const url = `https://community-platform-backend-h293.onrender.com/user/${userId}`;


  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setLoading(false);

    if (response.ok) {
      setPosts(Array.isArray(data) ? data : []);
      // toast.success("Fetched your posts!");
    } else {
      toast.error(data.message || "Failed to fetch posts.");
    }
  } catch (err) {
    setLoading(false);
    toast.error("Internal Server Error");
  }
};

useEffect(() => {
  fetchMyPosts();
}, []);

  return (
   
   <div className="max-w-4xl mx-auto p-6 space-y-4">
  <div className="w-full bg-white p-8 rounded-xl shadow-md relative">
  
    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
      My Posts
    </h1>

    {loading && (
      <div className="absolute inset-0 bg-white/70 z-50 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-gray-600 mt-2">Loading posts...</p>
      </div>
    )}

    {/* Posts List */}
    {posts && posts.length > 0 ? (
      posts.map((post) => (
        <div
          key={post._id}
          className="bg-white p-4 mb-4 rounded shadow border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-900">
            {post.author?.name}
          </h2>
          <p className="text-gray-700">{post.content}</p>
          <p className="text-sm text-gray-500 text-right">
            Posted: {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      ))
    ) : (
      !loading && (
        <p className="text-gray-600 text-center">No posts found.</p>
      )
    )}
  </div>
</div>

  );
};
