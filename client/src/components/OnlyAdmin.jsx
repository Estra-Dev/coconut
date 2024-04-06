import {useSelector} from 'react-redux'
import {Outlet} from 'react-router-dom'

const OnlyAdmin = () => {

  const {currentUser} = useSelector(state => state.user)

  return currentUser && currentUser.isAdmin && <Outlet /> 
}

export default OnlyAdmin