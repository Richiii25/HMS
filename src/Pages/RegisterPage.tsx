import { Button, PasswordInput, SegmentedControl, TextInput } from '@mantine/core';
import { IconHeartbeat } from '@tabler/icons-react';
import React from 'react';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../Service/UserService';
import { errorNotification, successNotification } from '../Utility/NotificationUtil';
const RegisterPage = () => {
  const navigate = useNavigate();

    const form = useForm({
    initialValues: {
      name: '',
      role:"PATIENT",
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      name:(value)=>(!value ? "Name cannot be empty" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => 
        !value
        ?"Password cannot be empty"
        // :/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{2,15}$/.test(value)
        // ?"Password must be 2-15 characters long, contain at least one uppercase letter, one number, and one special character"
        : null,
      confirmPassword: (value, values) => (value !== values.password ? 'Passwords do not match' : null),
    },
  });
    const handleSubmit = (values: typeof form.values) => {
      
      registerUser(values).then((data)=>{
        console.log(data);
          successNotification("User Registered Successfully");
          navigate("/login");
      }).catch((error)=>{
         console.log(error);
          errorNotification(error.response.data.errorMessage);
      })
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
        <div className='self-center font-medium font-heading text-black text-xl'>Register Account</div>
        <SegmentedControl {...form.getInputProps("role")} fullWidth size="md" radius="lg" color='pink' bg='none' className='[&_*]:!text-gray-800 border border-gray-900' data={[{label:'Patient', value:"PATIENT"}, {label:'Doctor', value:"DOCTOR"}, {label:'Admin', value:"ADMIN"}, ]} />;

           <TextInput {...form.getInputProps('name')} className='transistion-duration-300'
           variant="unstyled" size="md" radius="md" placeholder="Name" />
            <TextInput {...form.getInputProps('email')} className='transistion-duration-300'
           variant="unstyled" size="md" radius="md" placeholder="Email" />
           <PasswordInput {...form.getInputProps('password')} className='transistion-duration-300' variant="unstyled" size="md"  radius="md" placeholder="Password"
    />
    <PasswordInput {...form.getInputProps('confirmPassword')} className='transistion-duration-300' variant="unstyled" size="md"  radius="md" placeholder="Confirm Password"/>
    <Button radius= "md" size= "md" type='submit' color='pink'>Register</Button>
    <div className='text-neutral-900 text-sm self-center'>Already Have An Account?<Link to="/login" className="hover:underline">  Login</Link></div>
            </form>
        </div>
    </div>
  );
};

export default RegisterPage;

