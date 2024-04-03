import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import { LiaSignOutAltSolid } from "react-icons/lia";

const DashSidebar = () => {

   const location = useLocation()
  const [tab, setTab] = useState('')

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const getUrl = urlParams.get('tab')
    console.log(getUrl)
    if (getUrl) {
      setTab(getUrl)  
    }
  }, [location.search])

  return (
    <Sidebar className=' w-full md:56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item active={tab === 'profile'} icon={FaRegUserCircle} label="User" labelColor='dark' as='div'>
            <Link to={'/dashboard?tab=profile'}>Profile</Link>

          </Sidebar.Item>
          <Sidebar.Item icon={LiaSignOutAltSolid } className=" cursor-pointer">Sign Out</Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar