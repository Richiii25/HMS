import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TextInput } from '@mantine/core'
import { IconEdit } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DateInput } from '@mantine/dates';
import  { departments, specializations } from '../../../../Data/DropdownData';
import { useDisclosure } from '@mantine/hooks';
import { getDoctor, updateDoctor } from '../../../../Service/DoctorProfileService'; 
import { useForm } from '@mantine/form';
import { errorNotification, successNotification } from '../../../../Utility/NotificationUtil';
import { formatDate } from '../../../../Utility/DateUtiity';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const doctor:any = {
  name: 'John Doe',
  email: 'john@example.com',
  dob: '1999-08-21',
  phone: '9876543210',
  address: 'Berhampore, West Bengal',
  licenseNo: '1234-5678-9012',
  specializations: 'Cardialogist',
  departments: 'Cardiology',
  totalExp: '12 years',
  profilePicture:"https://example.com/profile.jpg"
};




const Profile = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user=useSelector((state:any)=>state.user)
    const [opened,{open,close}]= useDisclosure(false);
    
    const [editMode, setEdit]= React.useState(false);
    
     const [profile,setProfile]=useState(doctor);
            useEffect(() => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              getDoctor(user.profieId).then((data: any) => {
                setProfile({...data});
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              }).catch((error: any) => {
                console.log(error);
              })
            },[])
            const form=useForm({
                    initialValues: {
                        dob:'',
                        phone: '',   
                        address: '',
                        licenseNo:  '', 
                        specialization: '',
                        department: '',
                        totalExp: '',
                    },
                validate: {
                    dob: (value) => !value ? 'Date of Birth is required' : undefined,
                    phone: (value) => !value ? 'Invalid phone number' : undefined,
                    address: (value) => !value ? 'Address is required' : undefined,
                    licenseNo: (value) => !value ? 'License Number is required' : undefined,
                    specialization: (value) => !value ? 'Specialization is required' : undefined
                    
                }
            });
    
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const handleEdit = () => {
                form.setValues({...profile, dob: profile.dob? new Date(profile.dob):undefined});
                setEdit(true);
            }
    
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
        const handleSubmit = (values: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        updateDoctor({...profile, ...values}).then((data) => {
            successNotification("Profile Updated Successfully");
       setProfile({...profile, ...values});
       setEdit(false);
       
        }).catch((error) => {
            console.log(error);
           errorNotification(error.response.data.errorMessage);
        })
  return (
    <div className="p-10">
    <div className="flex justify-between items-center">
        <div className= "flex gap-5 items-center">
            <div className="flex flex-col items-center gap-3">
            <Avatar variant='filled' src="avatar.png" size={150} alt="it's me" />
            (editMode && <Button size="sm" onClick={open} variant="filled" leftSection>Upload</Button>)
         </div>  
          <div className="flex flex-col gap-3">
                <div className="text-3xl font-medium text-neutral-900">{user.name}</div>
            <div className="text-xl text-neutral-700">{user.email}</div>
        </div>
    </div>
    (!editMode ? <Button size="lg" onClick={() => setEdit(true)} variant="filled" leftSection={<IconEdit />}>Edit</Button>)
   
    </div>
    <Divider my="xl"/>
    <div>
        <div className='text-2xl font-medium mb-5 text-neutral-900'>Personal Information</div>
       <Table striped stripedColor="primary-1"verticalSpacing="md" withRowBorders={false}>
        <Table.Tbody className="[&>tr]:!mb-3 [&_td]:!w-1/2">
                   <Table.Tr>
                 <Table.Td className="font-semibold text-xl">Name</Table.Td>
                   (editMode ?) <Table.Td className="text-xl"> < TextInput placeholder="Name" /></Table.Td>
                   <Table.Td className="text-xl">{profile.name ?? '-'}</Table.Td>
                   </Table.Tr>
                  <Table.Tr>
                 <Table.Td className="font-semibold text-xl"> Email</Table.Td>
                   (editMode ?) <Table.Td className="text-xl"> < TextInput placeholder="Email" /></Table.Td>
                   <Table.Td className="text-xl">{profile.email ?? '-'}</Table.Td>
                 </Table.Tr>
                  <Table.Tr>
                 <Table.Td className="font-semibold text-xl"> Date Of Birth</Table.Td>
           {editMode ? (
             <Table.Td className="text-xl">
               <DateInput {...form.getInputProps("dob")} placeholder="Date Of Birth" />
             </Table.Td>
           ) : (
             <Table.Td className="text-xl">{formatDate(profile.dob ?? '-')}</Table.Td>
           )}
                 </Table.Tr>
                 
                  <Table.Tr>
                  <Table.Td className="font-semibold text-xl"> Phone Number</Table.Td>
                     (editMode ?) <Table.Td className="text-xl"> <NumberInput {...form.getInputProps("phone")} maxLength={10} clampBehavior="strict" placeholder="Phone number" hideControls />< TextInput placeholder="" /></Table.Td>
                   <Table.Td className="text-xl">{profile.phone ?? '-'}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                  <Table.Td className="font-semibold text-xl">Address</Table.Td>
                     (editMode ?) <Table.Td className="text-xl"> < TextInput {...form.getInputProps("address")} placeholder="Address" /></Table.Td>
                   <Table.Td className="text-xl">{profile.address ?? '-'}</Table.Td>
                  </Table.Tr>
           <Table.Tr>
           <Table.Td className="font-semibold text-xl">License No</Table.Td>
             (editMode ?) <Table.Td className="text-xl"> <NumberInput {...form.getInputProps("licenseNo")} placeholder="License Number" hideControls /> < TextInput placeholder="" /></Table.Td>
            <Table.Td className="text-xl">{profile.licenseNo ?? '-'}</Table.Td>
           </Table.Tr>
           <Table.Tr>
           <Table.Td className="font-semibold text-xl">Specialization</Table.Td>
            {editMode ? (
              <Table.Td className="text-xl"><Select {...form.getInputProps("specialization")} data={specializations} /></Table.Td>
            ) : (
              <Table.Td className="text-xl">{profile.specialization ?? '-'}</Table.Td>
            )}
           </Table.Tr>
          
           <Table.Tr>
           <Table.Td className="font-semibold text-xl">Department</Table.Td>
               (editMode ?) <Table.Td className="text-xl"> <Select {...form.getInputProps("department")} data={departments} /></Table.Td>
            <Table.Td className="text-xl">{profile.department ?? '-'}</Table.Td>
           </Table.Tr>
          
           <Table.Tr>
           <Table.Td className="font-semibold text-xl">Total Experience</Table.Td>
            (editMode ?) <Table.Td className="text-xl">  <NumberInput {...form.getInputProps("totalExp")} maxLength={2} max={50} clampBehavior="strict" placeholder="Total Experience" hideControls /></Table.Td>
            <Table.Td className="text-xl">{profile.totalExp ?? '-'} {profile.totalExp ? 'years' : ''} </Table.Td>
           </Table.Tr>
        </Table.Tbody>
      </Table>

    </div>
    <Modal centered opened={opened} onClose={close} title={<span className="text-xl font-medium">Upload Profile Picutre</span>}>
        {/* Modal content */}
      </Modal>
   </div>
  )
}
}


export {Profile}