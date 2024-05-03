import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LeftImage from "../assests/LOGIN.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_API_URL;
  const [user, setUser] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/auth/login`, formData,{
        withCredentials:true
      });
    
  
      if (response.status === 200) {
        const token = response.data.accessToken;
        const type = response.data.type;

        localStorage.setItem("type", type);
        localStorage.setItem("token", token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
      } else {
        setInvalidCredentials(true);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError("Something went wrong. Please try again later.");
    }
  };

  const isFormValid = () => {
    return formData.email !== '' && formData.password !== '';
  };

  useEffect(() => {
    const user = localStorage.getItem("type");
    setUser(user);
  }, []);

  return (
    <div className="min-h-full flex flex-col items-center justify-center bg-gray-100 w-full">
      <div className="w-full max-w-full md:max-w-screen bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: "100vh" }}>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          {/* Left Image */}
          <div className="hidden md:block bg-yellow-600 relative h-screen w-full" style={{ width: '40vw' }}>
            <img
              src={LeftImage}
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Login Form */}
          <div className="p-6 md:p-8 flex flex-col justify-center w-full relative">
            <h1 className="text-xl md:text-2xl my-5 font-semibold text-green-600 mb-3">Login to CODEcells</h1>
            {invalidCredentials ? <p className="text-red-500 mb-3 text-xs md:text-sm">* Invalid username or password</p> : <p></p>}

            {/* Sign Up Link - Top Right Corner */}
            <p className="absolute top-0 md:right-3 text-sm text-gray-600 mt-3">
              Not a member yet? <p onClick={()=>navigate('/signUp')} className="text-blue-500 cursor-pointer font-semibold">Sign up</p>
            </p>

            {/* Form */}
            <form className="space-y-3 w-full" onSubmit={handleSubmit}>
              {/* Username */}
              <div className="flex flex-col w-full">
                <label htmlFor="username" className="text-sm font-extrabold mb-1">Email</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="email"
                  id="email"
                  className="border bg-gray-100 p-1 rounded-md focus:outline-none focus:border-blue-500 w-4/5 h-9 text-sm"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col w-full">
                <label htmlFor="password" className="text-sm font-extrabold mb-1">Password</label>
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  id="password"
                  className="border bg-gray-100 p-1 rounded-md focus:outline-none focus:border-blue-500 w-4/5 h-9 text-sm"
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className={`bg-green-500 text-white p-1 rounded-md hover:bg-blue-600 transition-colors w-1/2 h-10 mt-3 text-sm ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`} // Add conditional classes for disabled state
                disabled={!isFormValid()} // Add disabled attribute
              >
                Login
              </button>
            </form>

            {/* Google Protection and Policy */}
            <p className="text-center text-gray-600 mt-3 text-xs">
              This site is protected by reCAPTCHA and the Google
              <span style={{ color: "blue" }}> Privacy Policy and Terms of Service </span>apply
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
