import {Avatar, Button, Dropdown, Navbar} from 'flowbite-react'
import { Link } from 'react-router-dom'
import { FaMoon, FaSun } from "react-icons/fa";
import image1 from "../assets/coconut-removebg-preview.png"
import { useSelector, useDispatch } from "react-redux"
import { toggleTheme } from '../redux/theme/themeSlice';

const Header = () => {

  const { currentUser } = useSelector((state) => state.user)
  const {theme} = useSelector(state => state.theme)
  const dispatch = useDispatch()
  const handleLightDarkMode = () => {
    dispatch(toggleTheme())
  }

  return (
    <Navbar className=' border-b-2 px-6 sticky top-0'>
      <Link to={'/'} className=' flex justify-center gap-1 items-center'>
        <span className=' font-semibold shadow-md text-gray-800 dark:text-gray-200 px-2'>coconut</span>
        <img src={image1} className=' w-8 h-8' alt="logo" />
      </Link>
      <div className=" flex justify-center items-center gap-1">
        {
          currentUser ? (
            <Dropdown label={<Avatar img={currentUser.photoUrl} rounded/>} inline arrowIcon={false}>
              <Dropdown.Header>
                <span className=' block text-sm'>{ currentUser.username }</span>
                <span className=' block text-sm font-medium'>{ currentUser.email }</span>
              </Dropdown.Header>
              <Dropdown.Item>
                <Link to={'/dashboard?tab=profile'}>Profile</Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Sign Out</Dropdown.Item>
            </Dropdown>
          ): (
            <Link to={'/login'}>
              <Button gradientDuoTone="cyanToBlue" outline>Log in</Button>
            </Link>
            
          )
        }
        <div className=" ">
          <Button className=' w-12 h-10 ml-2 border-0' pill color={'gray'} onClick={handleLightDarkMode}>
            {
              theme === 'light' ? (<FaMoon className=' self-center' />) : (<FaSun className=' self-center' />)
            }
            
          </Button>
        </div>
      </div>
    </Navbar>
  )
}

export default Header