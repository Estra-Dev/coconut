import {useSelector} from "react-redux"
import { Alert, Button, TextInput } from "flowbite-react"
import { BsPenFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashProfile = () => {

  const { currentUser } = useSelector(state => state.user)
  const [edit, setEdit] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)
  const filePicker = useRef()

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
        })
      }
    )
  }

  return (
    <div className=" max-w-lg mx-auto w-full p-3">
      <h1 className=" py-7 text-center text-3xl font-semibold">Personal Info</h1>
      <div className=" flex flex-col">
        <div className=" w-32 h-32 self-center shadow-md rounded-full relative" onClick={() => filePicker.current.click()}>
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
        <Button className=" w-32 self-center my-6" outline>Sign Out</Button>
        {
          edit ? (
            <form className=" flex flex-col gap-3 p-3 shadow-md rounded-md">
              <TextInput type="file" accept="images/*" onChange={handleImageChange} ref={filePicker} className=" hidden" />
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