import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../auth/auth";
import { toast } from "react-toastify";

export const MyProfile = () => {
  const { token } = useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(()=>{
    console.log("Profile is",profiles)
  },[profiles])

  const fetchProfiles = async () => {
    try {
      const response = await fetch(
        "https://community-platform-backend-h293.onrender.com/user/profile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setLoading(false);

      // Check if data is array or single object
      if (response.ok) {
        if (Array.isArray(data)) {
          setProfiles(data);
        } else if (typeof data === "object") {
          setProfiles([data]); // wrap object in array
        } else {
          toast.error("Unexpected response format.");
        }
      } else {
        toast.error(data.message || "Failed to fetch profile.");
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
      toast.error("Server error while loading profiles.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <div className="w-full bg-white p-8 rounded-xl shadow-md relative">
         <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
      My Profile
    </h1>

        {loading && (
          <div className="absolute inset-0 bg-white/70 z-50 flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-600 mt-2">Loading profiles...</p>
          </div>
        )}

        {Array.isArray(profiles) && profiles.length > 0 ? (
          profiles.map((profile) => (
            <div
              key={profile._id}
              className="bg-white p-4 mb-4 rounded shadow border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
              <p className="text-gray-700">Email: {profile.email}</p>
              <p className="text-gray-600">Bio: {profile.bio || "No bio provided."}</p>
              <p className="text-sm text-gray-500 text-right">
                Joined: {new Date(profile.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          !loading && <p className="text-gray-600">No profiles available.</p>
        )}
      </div>
    </div>
  );
};
