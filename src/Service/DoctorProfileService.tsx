import axiosInstance from "../Interceptor/AxiosInterceptor"


 const getDoctor = async(id:unknown) => {
    return axiosInstance.get('/profile/doctor/get/'+ id)
    .then((response) => (response as { data: unknown }).data)
     .catch((error:unknown)=>{throw error;})
}
const updateDoctor = async( doctor:unknown) => {
    return axiosInstance.put('/profile/doctor/update/'+ doctor)
    .then((response) => (response as { data: unknown }).data)
     .catch((error:unknown)=>{throw error;})
}

const getDoctorDropdown = async() => {
     return axiosInstance.get('/profile/doctor/getDropdown')
     .then((response) => (response as { data: unknown }).data)
     .catch((error:unknown)=>{throw error;})
}
export {getDoctor, updateDoctor, getDoctorDropdown};