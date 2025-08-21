import axiosInstance from "../Interceptor/AxiosInterceptor"

const registerUser = async(user:unknown) => {
    return axiosInstance.post('/user/register',user)
    .then((response) => (response as { data: unknown }).data)
     .catch((error:unknown)=>{throw error;})

}
const loginUser = async(user:unknown) => {
    return axiosInstance.post('/user/login',user)
    .then((response) => (response as { data: unknown }).data)
     .catch((error:unknown)=>{throw error;})
}

export {registerUser, loginUser}