import {useSelector} from 'react-redux'
import { Button } from 'flowbite-react'
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import AssetCard from '../components/AssetCard'

const MyStore = () => {

  const { currentUser } = useSelector(state => state.user)
  const [assets, setAssets] = useState([])

  useEffect(() => {
    getAssets()
  }, [])

  console.log(assets)

  const getAssets = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/asset/${currentUser._id}`, {
        withCredentials: true
      })
      console.log('my assets', res.data)
      setAssets(res.data.assets)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    console.log("Press delete")
    try {
      const res = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/asset/deleteasset/${id}`, {
        withCredentials: true
      })
      if (res.status === 200) {
        setAssets(prev => prev.filter(asset => asset._id !== id))
      }
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=" min-h-screen mt-2 md:max-w-6xl w-full mx-auto shadow-md md:p-7 p-3">
      {
        currentUser.isAdmin && (
          <div className=" flex justify-end p-3 shadow-md md:max-w-3xl w-full mx-auto">
            <Link to={'/generate-asset'}>
              <Button type='button' gradientDuoTone={'greenToBlue'}>Generate new Asset</Button>
            </Link>
          </div>
        )
      }
      {
        assets.length === 0 ? (<h1 className=' text-3xl text-gray-500 font-bold text-center mt-10'>You do not have any asset yet</h1>) : (

        <div className=" max-w-6xl w-full mx-auto mt-3 p-5 flex flex-col md:flex-row flex-wrap gap-4 md:gap-6">
          {
              assets.map(asset => (
                <div key={asset._id} className=" md:w-[30%]">
                  <AssetCard asset={asset} onDelete={handleDelete} />
                </div>
            ))
          }
        </div>
        )
      }
    </div>
  )
}

export default MyStore