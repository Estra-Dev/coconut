import {Alert, Button, FileInput, Select, TextInput} from 'flowbite-react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const GenerateAssets = () => {

  const [imageFile, setImageFile] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)
  const [formData, setFormData] = useState({})

  const handleImageChange = (ev) => {
    const file = ev.target.files[0]
    if (file) {
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file))
    }
  }

  console.log(imageFile, imageFileUrl)
  console.log(imageFileUploadProgress, imageFileUploadError)

  const uploadImage = () => {
    try {
      if (!imageFile) {
        return setImageFileUploadError("Asset image must be uploaded")
      }
      setImageFileUploadError(null)
      const storage = getStorage(app)
      const fileName = new Date().getTime() + "-" + imageFile.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, imageFile)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setImageFileUploadProgress(progress.toFixed(0))
        },
        (error) => {
          setImageFileUploadError("Cannot upload file")
          setImageFileUploadProgress(null)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl => {
            setImageFileUrl(downloadUrl)
            setFormData({ ...formData, image: downloadUrl })
            setImageFileUploadProgress(null)
          })
        }
      )

    } catch (error) {
      setImageFileUploadError("Image upload failed")
      setImageFileUploadProgress(null)
      console.log(error)
    }
    
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
  }

  return (
    <div className=" min-h-screen max-w-2xl mx-auto">
      <h1 className=" text-3xl font-semibold text-center py-4">The coconut Factory</h1>
      <form className=" flex flex-col gap-4 p-3" onSubmit={handleSubmit}>
        <div className=" flex flex-col sm:flex-row gap-4 flex-1 justify-center sm:items-end">
          <div className=" flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <TextInput placeholder='Asset name goes here' name='name' />
          </div>
          <div className=" flex flex-col gap-2">
            <label htmlFor="specie">Specie</label>
            <Select>
              <option value={'king'}>King coconut</option>
              <option value={'chowghat'}>Chowghat Orange Dwarf</option>
              <option value={'greendwarf'}>Green Dwarf</option>
              <option value={'maypan'}>Maypan Coconut</option>
              <option value={'eastcoast'}>East coast tall coconut</option>
            </Select>
          </div>
          <div className=" flex flex-col gap-2">
            <label htmlFor="stage">Stage</label>
            <Select>
              <option value="beginner">Beginner</option>
              <option value="pie">Pie</option>
              <option value="pulp">Pulp</option>
              <option value="sprouted">Sprouted</option>
            </Select>
          </div>
          <div className=" flex flex-col gap-2">
            <label htmlFor="age">Age</label>
            <Select>
              <option value="0">0</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="75">75</option>
            </Select>
          </div>
          <div className=" flex flex-col gap-2">
            <label htmlFor="value">Set Value</label>
            <TextInput type='number' placeholder='0.00' name='value'/>
          </div>
        </div>
        <div className=" flex items-center justify-between border-b-[1px] border-teal-500 py-2">
          <FileInput required type="file" accept='image/*' onChange={handleImageChange} />
          <Button type='button' gradientDuoTone={'cyanToBlue'} onClick={uploadImage} disabled={imageFileUploadProgress} outline>
            {
              imageFileUploadProgress ? (
                <div className=" w-9 h-9">
                  <CircularProgressbar value={imageFileUploadProgress} text={`${imageFileUploadProgress || 0}%`} />
                </div>
              ) : 'Upload'
            }
          </Button>
        </div>
          {
            imageFileUploadError && (
              <Alert color={'failure'}>{ imageFileUploadError }</Alert>
            )
          }
          {
            formData.image && (
            <div className=" flex justify-center items-center w-[100%] md:w-[65%] mx-auto ">
              <img src={formData.image} alt="asset image" className=' w-full h-72' />
            </div>
            )
          }
        <ReactQuill required theme="snow" className=' h-72 mb-20' placeholder='Describe this asset...' />
        <Button type='submit' gradientDuoTone={'greenToBlue'}>Generate Asset</Button>
      </form>
    </div>
  )
}

export default GenerateAssets