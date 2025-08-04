import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "https://community-platform-backend-h293.onrender.com/user/register";
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        toast.success("User Registered Successfully!");
        setFormData({ name: '', email: '', password: '', bio: '' });
        setTimeout(()=>{
        navigate("/login")
        },2000)
        
      } else if (response.status === 401) {
        toast.warning(data.message || "All Feilds are required");
      } else {
        toast.error(data.message || "Registration failed. Try again.");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Internal Server Error");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-blue-200 flex items-center justify-center px-4 relative">
         {loading && (
          <div className="absolute inset-0 bg-white/60 z-50 flex flex-col items-center justify-center">
            <div className="spinner" />
            <div className="loading">Registering...</div>
          </div>
        )}


        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md z-10">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                placeholder='Enter Your Name'
                type="text"
                name="name"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                placeholder='Enter Your Email'
                type="email"
                name="email"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                placeholder='Enter Your Password'
                type="password"
                name="password"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Bio</label>
              <textarea
                placeholder='Tell us about yourself'
                name="bio"
                rows="3"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.bio}
                onChange={handleChange}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
          </p>
        </div>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
};
