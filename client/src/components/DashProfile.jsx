import {useSelector} from "react-redux"
import { Alert, Button, TextInput } from "flowbite-react"
import { BsPenFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure, signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const DashProfile = () => {

  const { currentUser } = useSelector(state => state.user)
  const [edit, setEdit] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)
  const [formData, setFormData] = useState({})
  const [updated, setUpdated] = useState(false)
  const filePicker = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  console.log(imageFileUploadProgress, imageFileUploadError)

  const handleImageChange = (ev) => {
    const file = ev.target.files[0]
    if (file) {
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file))
      
    }
  }
  
  useEffect(() => {
    if (imageFile) {
      uploadImage()
    }
  }, [imageFile])

  const uploadImage = () => {
    // service firebase storage
  //   service firebase.storage {
  //   match /b/{bucket}/o {
  //     match /{allPaths=**} {
  //       allow read;
  //       allow write: if
  //       request.resource.size < 12 * 1024 * 1024 &&
  //       request.resource.contentType.matches('images/.*')
  //     }
  //   }
    // }

    setImageFileUploadError(null)
    setImageFileUploadProgress(null)
    
    const storage = getStorage(app)
    const fileName = new Date().getTime() + imageFile.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = 
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setImageFileUploadProgress(progress.toFixed(0))
      },
      (error) => {
        setImageFileUploadError("Could not upload image, (image file should be less than 12MB")
        setImageFileUploadProgress(null)
        setImageFile(null)
        setImageFileUrl(null)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl => {
          setImageFileUrl(downloadUrl)
          setFormData({...formData, googlePhotoUrl: downloadUrl})
        })
      }
    )
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }
  console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpdated(false)
    
    if (Object.keys(formData).length === 0) {
      return
    }
    
    try {
      dispatch(updateStart())
      const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/user/update/${currentUser._id}`, formData, {
        withCredentials: true
      })

      console.log(res)
      if (res.status === 200) {
        dispatch(updateSuccess(res.data))
        setUpdated(true)
        setFormData({...formData, newpassword: '', oldpassword: ''})
      }
    } catch (error) {
      dispatch(updateFailure(error.response.data.message))
    }
  }

  const handleSignOut = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/signout`)
      if (res.status === 200) {
        dispatch(signoutSuccess())
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=" max-w-lg mx-auto w-full p-3">
      <h1 className=" py-7 text-center text-3xl font-semibold">Personal Info</h1>
      <div className=" flex flex-col">
        <div className=" w-32 h-32 self-center shadow-md rounded-full relative" onClick={() => {
          edit && filePicker.current.click()
        }}>
          {
            imageFileUploadProgress && (

              <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: '100%',
                    height: '100%',
                    top: 0,
                    position: 'absolute',
                    left: 0
                  },
                  path: {
                    stroke: `rgba(25, 129, 188 ${imageFileUploadProgress / 100})`
                  }
                }}
                
              />
            )
          }
          <img src={imageFileUrl || currentUser.photoUrl} className={` w-full h-full object-cover rounded-full border-4 border-[lightgray] ${
            imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'
          }`} alt="user" />
        </div>
        {
          imageFileUploadError && (
            <Alert color={'failure'} className=" mt-3">{ imageFileUploadError }</Alert>
          )
        }
        <Button className=" w-32 self-center my-6" outline onClick={handleSignOut}>Sign Out</Button>
        {
          edit ? (
            <form className=" flex flex-col gap-3 p-3 shadow-md rounded-md" onSubmit={handleSubmit}>
              <TextInput type="file" accept="images/*" onChange={handleImageChange} ref={filePicker} className=" hidden" />
              <div className="">
                <label htmlFor="username">Username</label>
                <TextInput type="text" name="username" placeholder="Enter username" defaultValue={currentUser.username} onChange={handleChange} />
              </div>
              <div className="">
                <label htmlFor="oldpassword">Old Password</label>
                <TextInput type="password" name="oldpassword" placeholder="Enter old password" onChange={handleChange} />
              </div>
              <div className="">
                <label htmlFor="newpassword">New Password</label>
                <TextInput type="password" name="newpassword" placeholder="Enter new password" onChange={handleChange} />
              </div>
              <Button type="submit" gradientDuoTone={'greenToBlue'} className=" mt-4">Update</Button>
              {
                updated && (
                  <Alert color={'success'}>{ 'Your profile has been updated successfully' }</Alert>
                )
              }
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
              {
                  currentUser.generatedPassword && (
                    <div className=" p-4 border-b-[1px] border-[lightgray] dark:border-[#d3d3d354]">
                      <span className=" text-xs font-thin">This is a generated password for this account, for security purpose kindly update your password, copy and paste as old password ASAP.</span>
                      <p className=" text-sm font-semibold">{ currentUser.password }</p>
                    </div>
                )    
              }  
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