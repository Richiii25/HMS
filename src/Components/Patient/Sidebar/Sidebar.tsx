import React from 'react'
import { IconHeartbeat, IconLayoutGrid, IconCalendarCheck, IconUser } from '@tabler/icons-react';
import { Avatar, NavLink, Text } from '@mantine/core';
import { useSelector } from 'react-redux';



const links = [
    { name: 'Dashboard', url: '/patient/dashboard', icon: <IconLayoutGrid stroke={1.5} /> 
},
{ name: 'Profile', url: '/patient/profile', icon: <IconUser stroke={1.5} /> 
},
{ name: 'Appointments', url: '/patient/appointment', icon: <IconCalendarCheck stroke={1.5} /> },
];

const Sidebar = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user=useSelector((state:any)=>state.user);
  const pathname = window.location.pathname;
  return (
    <div className='flex'>
      <div className='w-64'>

      </div>
    <div className='w-64 fixed h-screen overflow-y-auto hide-scrollbar bg-gray-800 flex flex-col gap-8 items-center'>
        <div className='fixed z-500 py-3 bg-gray-800 text-blue-400 flex gap-1 items-center'>
            <IconHeartbeat size={40} stroke={2.5}/>
            <span className='font-heading font-semibold text-3xl'>Pulse</span>
        </div>
        <div className='flex flex-col mt-20 gap-5'>
        <div className='flex flex-col gap-1 items-center'>
        <div className='p-1 bg-white rounded-full shadow-lg'>
        <Avatar variant='filled' src="avatar.png" size="xl" alt="it's me" />
        </div>
         <span className='font-medium text-white'>{user.name}</span>
         <Text c="dimmed" className='text-white' size="xs">{user.role}</Text>
        </div>
        <div className='flex flex-col gap-1'>
          {links.map((link) => (
            <NavLink
              component="a"
              href={link.url}
              active={pathname === link.url}
              key={link.url}
              label={
                <span className="flex items-center gap-2 w-full font-medium text-blue-900 px-3 py-5 rounded-lg bg-primary-800 hover:bg-gray-100 hover:text-black text-white">
                  {link.icon}
                  <span>{link.name}</span>
                </span>
              }
            />
          ))}
        </div>
    </div>
    </div>
    </div>
  )
}

export default Sidebar
