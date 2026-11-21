import { createContext ,  useContext , useEffect , useState } from "react";

import api from "../services/api"

const AuthContext = createContext();


export const AuthProvider = ({children}) => {

   const [ user , setUser ] = useState(null);
   const [ loading , setLoading ] = useState(true);

   const checkAuth =async ()=>{
      try {
         const response  =await api.get("/auth/profile");
         setUser(response.data)
         return true;
      }

      catch(error){
        setUser(null);
        return false;
      }
      finally 
      {
        setLoading(false);
      }

   }

   useEffect(()=>{
    checkAuth();
   }, []);


   return (
       <AuthContext.Provider value ={{ user, loading , checkAuth , setUser }}>
          {children}
       </AuthContext.Provider>


   )
}

export const useAuth = () => useContext(AuthContext);