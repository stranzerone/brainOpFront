import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Avtaar from './Avtaar';



const Signup = () => {
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_API_URL;
 const [avtaar,setAvatarLink] = useState('')
const [name,setName] = useState('')
const [isChecked,setIsChecked] = useState('')

  const handleProfileSubmit = (avatarLink, name) => {
    setAvatarLink(avatarLink);
    setName(name);
  
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle checkbox status
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {

        if(isChecked){

        
        
      const response = await axios.post(`${backendUrl}/users/signup`, values,avtaar,name,{
        withCredentials:true
      });
   
      
      if (response.status === 200) {

        const response2 = await axios.get(`${backendUrl}/users/getCookie`,{
          withCredentials:true
        });
      if(response2.status===200){
     
        navigate("/posts")
      }
      } else if (response.status === 209) {
        setErrors({ email: 'Email already in use' });
      } else {
        setErrors({ general: 'Failed to register' });
      }
    }else{
        window.alert("Check the Terms and Conditions")
    }
    } catch (error) {
      console.error('Error signing up:', error);
      setErrors({ general: 'Something went wrong. Please try again later.' });
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center bg-gray-100 w-full">
      <div className="max-w-full md:max-w-screen bg-white rounded-lg shadow-lg overflow-hidden">

        <div className="grid grid-cols-1 md:grid-cols-2 w-full ">
          {/* Left Image */}
          <motion.div
            className="relative h-full w-full md:w-3/5 lg:w-4/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Avtaar  onSubmit={handleProfileSubmit}/>
          </motion.div>

          {/* Signup Form */}
          <div className="p-6 md:p-8 flex flex-col justify-center w-full relative">
            <h1 className="text-xl md:text-2xl my-5 font-semibold mb-3">Create an Account</h1>

            {/* Form */}
            <Formik
              initialValues={{
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
              }}
              validationSchema={Yup.object({
                username: Yup.string().required('Required'),
                email: Yup.string().email('Invalid email address').required('Required'),
                password: Yup.string().required('Required'),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref('password'), null], 'Passwords must match')
                  .required('Required')
              })}
              onSubmit={handleSubmit}
            >
              <Form className="space-y-3 w-full">
                {/* Username */}
                <div className="flex flex-col w-full">
                  <label htmlFor="username" className="text-sm font-extrabold mb-1">Username:</label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    className="border bg-gray-100 p-1 rounded-md focus:outline-none focus:border-blue-500 w-full h-9 text-sm"
                  />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-xs" />
                </div>

                {/* Email */}
                <div className="flex flex-col w-full">
                  <label htmlFor="email" className="text-sm font-extrabold mb-1">Email:</label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="border bg-gray-100 p-1 rounded-md focus:outline-none focus:border-blue-500 w-full h-9 text-sm"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
                </div>

                {/* Password */}
                <div className="flex flex-col w-full relative">
                  <label htmlFor="password" className="text-sm font-extrabold mb-1">Password:</label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="border bg-gray-100 p-1 rounded-md focus:outline-none focus:border-blue-500 w-full h-9 text-sm"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col w-full relative">
                  <label htmlFor="confirmPassword" className="text-sm font-extrabold mb-1">Confirm Password:</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="border bg-gray-100 p-1 rounded-md focus:outline-none focus:border-blue-500 w-full h-9 text-sm"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs" />
                </div>

                {/* Error message */}
                <ErrorMessage name="general" component="div" className="text-red-500 text-xs" />

                {/* Signup Button */}
                <input
          type="checkbox"
          id="terms"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        <label htmlFor="terms">I agree to the terms and conditions</label>
        <br />
                <button
                  type="submit"
                  className="bg-green-500 text-white p-1 rounded-md hover:bg-green-600 transition-colors w-full h-10 mt-3 text-sm"
                >
                  Sign Up
                </button>
              </Form>
            </Formik>

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

export default Signup;
