import React from 'react'
import { Navigate, Route,Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Customize from './pages/Customize'
import Home from './pages/Home'
function App(){
  const{userData,setUserData}=useContext(UserContext)
  return(
    <Routes>
      <Route path='/signup' element={(userData?.assistantImage && 
      userData?.assistantName)?
        <Home />:<Navigate to={"/customize"} />}/>
      <Route path='/signup' element={!userData?<SignUp />:<Navigate to={"/"} />} />
      <Route path='/signin' element={!userData?<SignIn />:<Navigate to={"/"} />} />
      <Route path='/signin' element={userData?<Customize />:<Navigate to={"/signin"} />} />
    </Routes>
  )
}
export default App