import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSpinner, FaHeart } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';
import './custom.css'; // Import the custom CSS
import { useNavigate } from 'react-router-dom';

const PostListScreen = () => {
 const [posts, setPosts] = useState([]);
 const [loading, setLoading] = useState(false);
const navigate = useNavigate()
const backendUrl = process.env.REACT_APP_API_URL;

 useEffect(() => {
    fetchPosts();
 }, []);

 const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/posts/posts`,{
        withCredentials:true
      });
      const newPosts = response.data;
      setPosts(newPosts);
   
      
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
 };

 return (
    <div className="container mx-auto py-8 bg-gray-200">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Post List</h1>
      <button onClick={()=>navigate('/passwordreset')}  type="button"
  className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
>Password Reset</button>
      <div className="flex flex-wrap justify-center gap-8">
        {posts.map(item => (
          <motion.div key={item.id} className="post bg-gradient-to-r from-blue-500 to-green-500 hover:from-pink-500 hover:to-yellow-500 shadow-lg rounded-lg p-4 w-full  hover:shadow-xl">
            <h2 className="text-xl flex justify-center items-center py-7 font-black text-white">{item.title}</h2>
            <p className="text-gray-200">{item.body}</p>
            <div className="flex items-center justify-end gap-4 mt-4">
              <span className="text-sm text-right  text-white font-semibold">{item.tags.join(', ')}</span>
              <button className="text-white hover:text-gray-200">
                <FaHeart />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      {loading && (
        <div className="flex justify-center itmes-center mt-8">
          <FaSpinner className="animate-spin mr-2" />
          <span>Loading...</span>
        </div>
      )}
      <div>
      </div>
    </div>
 );
};

export default PostListScreen;
