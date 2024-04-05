import { Alert, Button, TextInput } from "flowbite-react"
import image1 from "../assets/coconut-removebg-preview.png"
import { useState } from "react"
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom"
import OAuth from "../components/OAuth"

const Signup = () => {

  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const navigate = useNavigate()

  const handleChange = (ev) => {
    const { name, value } = ev.target
    setDetails({...details, [name]: value})
  }

  console.log(details)

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setErrorMsg("")
    setError(false)

    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/signup`, details)
      console.log(res)

      if (res.status === 201) {
        navigate("/login")
      }
    } catch (error) {
      setError(true)
      setErrorMsg(error.response.data.message)
      console.log(error)
    }
  }


  return (
    <div className=" min-h-screen flex flex-col justify-center items-center">
      <div className=" flex flex-col justify-center items-center gap-3 max-w-3xl w-full bg-white mx-auto py-7 px-10 rounded-md shadow-md ">
        <h1 className=" font-semibold text-gray-800 shadow-md px-3">Create a coconut Account</h1>
        <img src={image1} className=" w-12 h-12" alt="logo" />
        <form className=" w-full flex flex-col gap-6 p-3 rounded-md shadow-lg" onSubmit={handleSubmit}>
          <div className=" ">
            <label htmlFor="username">Username</label>
            <TextInput type="text" placeholder="Enter username..." name="username" value={details.username} onChange={handleChange} />
          </div>
          <div className="">
            <label htmlFor="email">Email</label>
            <TextInput type="email" placeholder="Enter email..." name="email" value={details.email} onChange={handleChange} />
          </div>
          <div className="">
            <label htmlFor="password">Password</label>
            <TextInput type="password" placeholder="Enter password" name="password" value={details.password} onChange={handleChange} />
          </div>
          {
            error && (
              <Alert color={'failure'} className=" mt-3">{ errorMsg }</Alert>
            )
          }
          <Button type="submit">Sign up</Button>
          <OAuth />
        </form>
        <div className=" flex gap-2">
          <p className=" text-gray-700">Already have an account? </p>
          <Link to={'/login'} className=" text-blue-500 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup