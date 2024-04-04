import {useSelector} from "react-redux"
import { Button, TextInput } from "flowbite-react"
import { BsPenFill } from "react-icons/bs";
import { useState } from "react";

const DashProfile = () => {

  const { currentUser } = useSelector(state => state.user)
  const [edit, setEdit] = useState(false)

  return (
    <div className=" max-w-lg mx-auto w-full p-3">
      <h1 className=" py-7 text-center text-3xl font-semibold">Personal Info</h1>
      <div className=" flex flex-col">
        <div className=" w-32 h-32 self-center shadow-md rounded-full">
          <img src={currentUser.photoUrl} className=" w-full h-full object-cover rounded-full border-4 border-[lightgray]" alt="user" />
        </div>
        <Button className=" w-32 self-center my-6" outline>Sign Out</Button>
        {
          edit ? (
            <form className=" flex flex-col gap-3 p-3 shadow-md rounded-md">
              <div className="">
                <label htmlFor="username">Username</label>
                <TextInput type="text" name="username" placeholder="Enter username" defaultValue={currentUser.username} />
              </div>
              <div className="">
                <label htmlFor="oldpassword">Old Password</label>
                <TextInput type="password" name="oldpassword" placeholder="Enter old password" />
              </div>
              <div className="">
                <label htmlFor="newpassword">New Password</label>
                <TextInput type="password" name="newpassword" placeholder="Enter new password" />
              </div>
              <Button gradientDuoTone={'greenToBlue'} className=" mt-4">Update</Button>
            </form>
          ) : (
            <div className=" flex flex-col gap-6">
              <div className=" p-3 border-b-[1px] border-[lightgray] dark:border-[#d3d3d354]">
                <span className=" text-xs font-thin">Username</span>
                <p className=" text-sm font-semibold">{ currentUser.username }</p>
              </div>
              <div className=" p-4 border-b-[1px] border-[lightgray] dark:border-[#d3d3d354]">
                <span className=" text-xs font-thin">Email</span>
                <p className=" text-sm font-semibold">{ currentUser.email }</p>
              </div>
              <div className=" p-4 border-b-[1px] border-[lightgray] dark:border-[#d3d3d354]">
                <span className=" text-xs font-thin">Active since</span>
                <p className=" text-sm font-semibold">{ new Date(currentUser.createdAt).toLocaleDateString() }</p>
              </div>
              <Button  gradientDuoTone={'greenToBlue'} onClick={() => setEdit(true)}>
                <BsPenFill className=" mr-2" />
                Edit info
              </Button>
            </div>
            
          )
        }
      </div>
    </div>
  )
}

export default DashProfile