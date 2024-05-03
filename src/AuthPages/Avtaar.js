import React, { useState } from 'react';
import { BiSolidCameraPlus } from "react-icons/bi";
import axios from 'axios';

const Profile = ({onSubmit}) => {
  const [avatarURL, setAvatarURL] = useState('');
  const [location, setLocation] = useState('');
  const CLOUD_URL = process.env.REACT_APP_IMAGE_CLOUD;
  const PRESET = process.env.REACT_APP_IMAGE_PRESET;







  const uploadAvatar = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', PRESET);
  
      const response = await axios.post(
       CLOUD_URL,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setAvatarURL(response.data.secure_url);

    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
    }
  };

  const handleNext = async () => {
    try {
      // Sending data logic
      onSubmit(avatarURL, location); // Pass avatar link and location to parent component
    } catch (error) {
      console.error('Error sending data to localhost:', error);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center ">
      <div className="w-full max-w-md bg-green-100 rounded-lg shadow-lg overflow-hidden  p-8 space-y-6">
        
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">Welcome! Let's create your Avtaar (Optional)</h1>
          <p className="text-sm text-gray-600 mt-2">Get Post Put Everything You Need!</p>
        </div>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center space-y-4">
          {avatarURL ? 
            <img src={avatarURL} alt="Avatar" className="w-32 h-32 rounded-full mb-2 shadow-md" />
            :
            <div className="relative w-32 h-32 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center mb-2">
              <BiSolidCameraPlus className="w-12 h-12 text-gray-500" />
            </div>
          }
          <input 
            type="file" 
            onChange={uploadAvatar} 
            className="hidden" 
            id="avatarInput" 
          />
          <label htmlFor="avatarInput" className="bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 cursor-pointer transition-colors">
            Choose image
          </label>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="location" className="text-sm font-medium text-gray-600">Name</label>
          <input 
            type="text" 
            id="location" 
            placeholder="Enter Your Name" 
            className="border border-gray-300 rounded-md p-2 text-sm focus:border-blue-500 focus:outline-none bg-gray-200 focus:bg-red-100"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Next Button */}
        <button 
          onClick={handleNext} 
          disabled={!avatarURL || !location} 
          className={`bg-pink-500 text-white px-4 py-2 rounded-full text-sm hover:bg-pink-600 transition-colors ${(!avatarURL || !location) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>

      </div>
    </div>
  );
};

export default Profile;
