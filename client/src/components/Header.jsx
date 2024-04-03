import {Button, Navbar} from 'flowbite-react'
import { Link } from 'react-router-dom'
import { FaMoon } from "react-icons/fa";
import image1 from "../assets/coconut-removebg-preview.png"

const Header = () => {
  return (
    <Navbar className=' border-b-2 px-6 sticky top-0'>
      <Link to={'/'} className=' flex justify-center gap-1 items-center'>
        <span className=' font-semibold shadow-md text-gray-800'>coconut</span>
        <img src={image1} className=' w-8 h-8' alt="logo" />
      </Link>
      <div className=" flex justify-center gap-1">
        <Link to={'/login'}>
          <Button gradientDuoTone="cyanToBlue" outline>Log in</Button>
        </Link>
        <div className=" ">
          <Button className=' w-12 h-10' pill color={'gray'}>
            <FaMoon />
          </Button>
        </div>
      </div>
    </Navbar>
  )
}

export default Header