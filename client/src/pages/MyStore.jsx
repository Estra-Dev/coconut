import {useSelector} from 'react-redux'
import { Button } from 'flowbite-react'
import {Link} from 'react-router-dom'

const MyStore = () => {

  const {currentUser} = useSelector(state => state.user)

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
    </div>
  )
}

export default MyStore