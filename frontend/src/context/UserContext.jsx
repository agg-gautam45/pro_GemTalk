
import React, { createContext, useState } from 'react'
import { useEffect } from 'react'
import axios from "axios";

export const UserContext = createContext()
function UserProvider({ children }) {
  const serverurl = "http://localhost:8000" 
  const [userData,setUserData]= useState(null)
  const handleCurrentUser=async ()=>{
    try{
      const result=await axios.get(`${serverurl}/api/user/current`,{withCredentials:true})
      setUserData(result.data)
      console.log(result.data)

    }catch(error){
      console.log(error)

    }
  }
  useEffect(()=>{
    handleCurrentUser()
  },[])
  const value = { serverurl,userData,setUserData }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
