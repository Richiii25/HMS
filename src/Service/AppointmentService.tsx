import axiosInstance from "../Interceptor/AxiosInterceptor"

const scheduleAppointment = async(data:unknown) => {
    return axiosInstance.post('/appointment/schedule',data)
    .then((response) => (response as { data: unknown }).data)
     .catch((error:unknown)=>{throw error;})

}
const cancelAppointment = async(id:unknown) => {
    return axiosInstance.post('/appointment/cancel/' +id)
    .then((response) => (response as { data: unknown }).data)
     .catch((error:unknown)=>{throw error;})
}

const getAppointment = async(id:unknown) => {
    return axiosInstance.post('/appointment/get/' +id)
    .then((response) => (response as { data: unknown }).data)
     .catch((error:unknown)=>{throw error;})
}

const getAppointmentDetails = async(id:unknown) => {
    return axiosInstance.post('/appointment/get/details/' +id)
    .then((response) => (response as { data: unknown }).data)
     .catch((error:unknown)=>{throw error;})
}
export {scheduleAppointment, cancelAppointment, getAppointment, getAppointmentDetails}