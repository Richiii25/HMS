import { Button, PasswordInput, TextInput } from '@mantine/core';
import { IconHeartbeat } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import {  useNavigate } from 'react-router-dom';
import { loginUser } from '../Service/UserService';
import { errorNotification, successNotification } from '../Utility/NotificationUtil';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { setJwt } from '../Slices/JwtSlice';
import { setUser } from '../Slices/UserSlice';
import { Link } from 'react-router-dom';
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const [loading, setLoading]= useState(false);
    const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (!value?"Password cannot be empty": null),
    },
  });
   const handleSubmit = (values: typeof form.values) => {
  setLoading(true);
  loginUser(values).then((data) => {
    if (typeof data === 'string') {
      console.log(jwtDecode(data)); // Safe usage
      successNotification("User Logged In Successfully");
      const user:unknown= jwtDecode(data);
      console.log(user);
      navigate('${user?.role?.toLowerCase()/dashboard');
      dispatch(setJwt(data));
      dispatch(setUser (jwtDecode(data)));
      
    } else {
      errorNotification("Invalid token format received");
    }
  }).catch((error) => {
    errorNotification(error?.response?.data?.errorMessage);
  }).finally(() => setLoading(false));
};
   

  return (
    <div
      style={{
        backgroundImage:  
         "url('https://wallpapercave.com/wp/wp8002958.jpg')" }}
      className="h-screen w-screen !bg-cover !bg-center !bg-no-repeat flex flex-col items-center justify-center"
    >
        <div className=' py-3  text-pink-400 flex gap-1 items-center'>
                    <IconHeartbeat size={45} stroke={2.5}/>
                    <span className='font-heading font-semibold text-4xl'>Pulse</span>
                </div>
        <div className='w-[450px] backdrop-blur-md p-10 py-8 rounded-lg'>
            <form onSubmit={form.onSubmit(handleSubmit)} className='flex flex-col gap-5 [&_input]:placeholder-neutral-100 [&_.mantine-Input-input]:!border-gray-500 focus-within:[&_.mantine-Input-input]:!border-pink-200 [&_mantine-Input-input]: !border-white [&_input]:!pl-2 [&_svg]:!text-black'>
        <div className='self-center font-medium font-heading text-black text-xl'>Login</div>
            <TextInput {...form.getInputProps('email')} className='transistion-duration-300'
           variant="unstyled" size="md" radius="md" placeholder="Email" />
           <PasswordInput {...form.getInputProps('password')} className='transistion-duration-300' variant="unstyled" size="md"  radius="md" placeholder="Password"
    />
    <Button loading= {loading} radius= "md" size= "md" type='submit' color='pink'>Login</Button>
    <div className='text-neutral-900 text-sm self-center'>Don't Have An Account?<Link to="/register" className="hover:underline">  Register</Link></div>
            </form>
        </div>
    </div>
  );
};

export default LoginPage;


