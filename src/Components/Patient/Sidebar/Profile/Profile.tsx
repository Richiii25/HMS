import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from '@mantine/core'
import { IconEdit } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DateInput } from '@mantine/dates';
import bloodGroups from '../../../../Data/DropdownData';
import { useDisclosure } from '@mantine/hooks';
import { getPatient, updatePatient } from '../../../../Service/PatientProfileService';
import { formatDate } from '../../../../Utility/DateUtiity';
import { useForm } from '@mantine/form';
import { errorNotification, successNotification } from '../../../../Utility/NotificationUtil';
import { arrayToCSV } from '../../../../Utility/OtherUtility';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const patient:any = {
  name: 'John Doe',
  email: 'john@example.com',
  dob: '1999-08-21',
  phone: '9876543210',
  address: 'Berhampore, West Bengal',
  aadharNo: '1234-5678-9012',
  bloodGroup: 'O+',
  allergies: 'None',
  chronicDisease: 'Hypertension',
  profilePicture:"https://example.com/profile.jpg"
};




const Profile = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user=useSelector((state:any)=>state.user)
    const [opened,{open,close}]= useDisclosure(false);
    
    const [editMode, setEdit]= React.useState(false);
    const [profile,setProfile]=useState(patient);
        useEffect(() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          getPatient(user.profieId).then((data: any) => {
            setProfile({...data, allergies: data.allergies? arrayToCSV(JSON.parse(data.allergies)): null, chronicDisease: data.chronicDisease? arrayToCSV(JSON.parse(data.chronicDisease)): null});
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          }).catch((error: any) => {
            console.log(error);
          })
        }, [user.profieId])
        const form=useForm({
            mode:'uncontrolled',
                initialValues: {
                    dob:'',
                    phone: '',   
                    address: '',
                    aadharNo:  '', 
                    bloodGroup: '',
                    allergies: [],
                    chronicDisease: []
                },
            validate: {
                dob: (value) => !value ? 'Date of Birth is required' : undefined,
                phone: (value) => !value ? 'Invalid phone number' : undefined,
                address: (value) => !value ? 'Address is required' : undefined,
                aadharNo: (value) => !value ? 'Aadhar number is required' : undefined,
                bloodGroup: (value) => !value ? 'Blood group is required' : undefined
                
            }
        });

        const handleEdit = () => {
            form.setValues({...profile, dob: profile.dob? new Date(profile.dob):undefined, chronicDisease: profile.chronicDisease?? [], allergies: profile.allergies?? []});
            setEdit(true);
        }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    const handleSubmit = (values: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatePatient({...profile, ...values, allergies: values.allergies?JSON.stringify(values.allergies): null, chronicDisease: values.chronicDisease? JSON.stringify(values.chronicDisease): null,}).then((_data) => {
        successNotification("Profile Updated Successfully");
   setProfile({...profile, ...values});
   setEdit(false);
   
    }).catch((error) => {
        console.log(error);
       errorNotification(error.response.data.errorMessage);
    })


  return (
    <form className="p-10">
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
    (!editMode && <Button size="lg" type= "button" onClick={handleEdit} variant="filled" leftSection={<IconEdit />}>Edit</Button>)
        <Button onClick={handleSubmit} size="lg" type="submit"  variant="filled" color="pink">Submit</Button>
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
           <Table.Td className="font-semibold text-xl">Aadhar no</Table.Td>
             (editMode ?) <Table.Td className="text-xl"> <NumberInput {...form.getInputProps("aadharNo")} maxLength={12} clampBehavior="strict" placeholder="Aadhar number" hideControls /> < TextInput placeholder="" /></Table.Td>
            <Table.Td className="text-xl">{profile.aadharNo ?? '-'}</Table.Td>
           </Table.Tr>
           <Table.Tr>
           <Table.Td className="font-semibold text-xl">Blood Group</Table.Td>
            {editMode ? (
              <Table.Td className="text-xl"><Select {...form.getInputProps("bloodGroup")} placeholder="Bloof Group" data={bloodGroups} /></Table.Td>
            ) : (
              <Table.Td className="text-xl">{profile.bloodGroup ?? '-'}</Table.Td>
            )}
           </Table.Tr>
          
           <Table.Tr>
           <Table.Td className="font-semibold text-xl">Allergies</Table.Td>
               (editMode ?) <Table.Td className="text-xl"> <TagsInput {...form.getInputProps("allergies")} label="Please Enter to submit a tag" placeholder="Allergies separated by comma" /></Table.Td>
            <Table.Td className="text-xl">{profile.allergies ?? '-'}</Table.Td>
           </Table.Tr>
          
           <Table.Tr>
           <Table.Td className="font-semibold text-xl">Chronic Disease</Table.Td>
            (editMode ?) <Table.Td className="text-xl"> < TagsInput {...form.getInputProps("chronicDisease")} label="Please Enter to submit a tag" placeholder="Chronic Diseases separated by comma" /></Table.Td>
            <Table.Td className="text-xl">{profile.chronicDisease ?? '-'}</Table.Td>
           </Table.Tr>
        </Table.Tbody>
      </Table>

    </div>
    <Modal centered opened={opened} onClose={close} title={<span className="text-xl font-medium">Upload Profile Picutre</span>}>
        {/* Modal content */}
      </Modal>
   </form>
  )
}

}



export default Profile

