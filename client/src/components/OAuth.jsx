import { Button } from 'flowbite-react'
import { AiFillGoogleCircle } from "react-icons/ai";
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
import { app } from '../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/user/userSlice';

const OAuth = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleGoogleClick = async () => {
    dispatch(loginStart())

    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({prompt: "select_account"})
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider)
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/google`, {
        username: resultFromGoogle.user.displayName,
        email: resultFromGoogle.user.email,
        googlePhotoUrl: resultFromGoogle.user.photoURL
      }, {
        withCredentials: true
      })

      if (res.status === 200) {
        dispatch(loginSuccess(res.data))
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      dispatch(loginFailure(error.response.data.message))
    }
  }

  return (
    <Button type='button' gradientDuoTone={'tealToLime'} outline onClick={handleGoogleClick}>
      <AiFillGoogleCircle size={'20'} />
      <span className=' ml-2' >Continue with Google</span>
    </Button>
  )
}

export default OAuth