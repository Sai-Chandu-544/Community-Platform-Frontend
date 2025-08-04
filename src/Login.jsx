import { useContext,useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import {AuthContext} from '../auth/auth';


export const Login=()=> {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

 
  
 const [loading,setLoading]=useState(false)

  
const navigate=useNavigate()

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };


 const { login} = useContext(AuthContext);

  const handleSubmit = async(e) => {
    e.preventDefault();

    const url = "https://community-platform-backend-h293.onrender.com/user/login";
    setLoading(true);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);
     

       if (response.ok) {
       login(data.token, formData.email)
      
     
        toast.success("Login Successfully!");
        setFormData({ email: '', password: ''});

        setTimeout(() => {
          navigate("/")
          
        }, 1000)
      
      }else if(response.status===404){
        toast.error("User Not Found!")
      }
        
        
        else {
        toast.error("Login failed. Try again.");
      }

    
     
    }catch(err){
         toast.error("Internal Server Error");

    }
   
    
    
  };
   
 

  return (

    <div className="min-h-screen bg-blue-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md relative">
        {loading && (
          <div className="absolute inset-0 bg-white/60 z-50 flex flex-col items-center justify-center">
            <div className="spinner" />
            <div className="loading">Logging in...</div>
          </div>
        )}

        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              placeholder="Enter Your Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              placeholder="Enter Your Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
   
  );
}
