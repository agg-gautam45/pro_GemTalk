// SignUp.jsx
import React, { useState, useContext } from 'react'
import bg from "/Users/gautamaggarwal/Desktop/webd_projects/virtualassistant/frontend/src/assets/authBg.png"
import { IoEye, IoEyeOff } from "react-icons/io5"
import { useNavigate } from 'react-router-dom'
import { UserContext } from '/Users/gautamaggarwal/Desktop/webd_projects/virtualassistant/frontend/src/context/UserContext.jsx' // ✅ Make sure path is correct
import axios from "axios"
function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const { serverurl,userData,setUserData } = useContext(UserContext) 
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

    const [loading,setLoading]=useState(false)
  const [password, setPassword] = useState("")
const[err,setErr]=useState("")
  const handleSignup = async (e) => {
  e.preventDefault();
  setErr("")
  setLoading(true)

  try {
    let result = await axios.post(
      `${serverurl}/api/auth/signup`,
      {
        name,
        email,
        password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setUserData(result.data)
    setLoading(false)
  } catch (error) {
  console.log("Signup error:", error.response?.data || error.message);
  setLoading(false)
  setUserData(null)
  const msg = error.response?.data?.message || "Signup failed";
  setErr(msg);
}

};


  return (
    <div
      className="w-full h-[100vh] bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form className='w-[90%] h-[600px] max-w-[500px] bg-[rgba(0,0,0,0.2)] backdrop-blur shadow-lg
       shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px] mt-[-40px]
        ' onSubmit={handleSignup}>
        <h1 className='text-white text-[30px] font-semibold mb-[30px]'>
          Register to <span className='text-blue-400'>Virtual Assistant</span>
        </h1>

        <input type="text" placeholder='Enter your Name'
          className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]'
          required value={name} onChange={(e) => setName(e.target.value)} />

        <input type="email" placeholder='Email'
          className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]'
          required value={email} onChange={(e) => setEmail(e.target.value)} />

        <div className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative'>
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Password'
            className='w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px]'
            required value={password} onChange={(e) => setPassword(e.target.value)}
          />
          {!showPassword && (
            <IoEye className='absolute top-[18px] right-[20px] h-[25px] w-[25px] text-white cursor-pointer' onClick={() => setShowPassword(true)} />
          )}
          {showPassword && (
            <IoEyeOff className='absolute top-[18px] right-[20px] h-[25px] w-[25px] text-white cursor-pointer' onClick={() => setShowPassword(false)} />
          )}
        </div>
       {typeof err === "string" && err.length > 0 && (
  <p className='text-red-500 text-[18px]'>*{err}</p>
)}


        <button className='min-w-[150px] h-[60px] mt-[30px] bg-white rounded-full text-black text-[19px] font-semibold'
        disabled={loading}>
          { loading?"Loading...":"Sign Up"}
        </button>

        <p className='text-white text-[18px] cursor-pointer' onClick={() => navigate("/signin")}>
          Already have an account? <span className='text-blue-400'>Sign in</span>
        </p>
      </form>
    </div>
  )
}

export default SignUp
