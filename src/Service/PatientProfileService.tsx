import axiosInstance from "../Interceptor/AxiosInterceptor"


 const getPatient = async(id:unknown) => {
    return axiosInstance.get('/profile/patient/get/'+ id)
    .then((response) => (response as { data: unknown }).data)
     .catch((error:unknown)=>{throw error;})
}
const updatePatient = async( patient:unknown) => {
    return axiosInstance.put('/profile/patient/update/'+ patient)
    .then((response) => (response as { data: unknown }).data)
     .catch((error:unknown)=>{throw error;})
}

export {getPatient, updatePatient};