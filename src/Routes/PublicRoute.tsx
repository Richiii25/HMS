import { jwtDecode } from "jwt-decode";
import type { JSX } from "react"
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface PublicRouteProps{
    children:JSX.Element 
}
const PublicRoute:React.FC<PublicRouteProps>=({children})=>{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const token=useSelector((state:any)=>state.jwt)
    if(token){
          const user: unknown = jwtDecode(token);
          console.log(user);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return <Navigate to={`/${(user as any)?.role?.toLowerCase()}/dashboard`} />;
    }
    return children;
}
export default PublicRoute;