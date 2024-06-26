import { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'

const Dashboard = () => {

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
    <div className=' min-h-screen flex flex-col md:flex-row'>
      {/* Sidebar */}
      <div className=" md:w-56">
        <DashSidebar />
      </div>
      {/* Profile... */}
      {tab === 'profile' && <DashProfile />}
    </div>
  )
}

export default Dashboard