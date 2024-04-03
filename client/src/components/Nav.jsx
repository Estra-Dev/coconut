import { Navbar } from "flowbite-react"
import { Link } from "react-router-dom"
import { MdMoreHoriz } from "react-icons/md";
import { RiHomeLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { LiaStoreAltSolid } from "react-icons/lia";
import { AiFillAppstore } from "react-icons/ai";

const Nav = () => {

  const {currentUser} = useSelector(state => state.user)

  return (
    <Navbar className={`${!currentUser ? 'px-10' : 'px-8'}  border-t-2`}>
      <Link to={'/'} className=" flex flex-col items-center justify-center">
        <span><RiHomeLine /></span>
        <span className=" text-xs font-semibold">Home</span>
      </Link>
      {
        currentUser && (
          <Link to={'/market'} className=" flex flex-col items-center justify-center">
            <span><LiaStoreAltSolid /></span>
            <span className=" text-xs font-semibold">Market</span>
          </Link>
        )
      }
      {
        currentUser && (
          <Link to={'/my-store'} className=" flex flex-col items-center justify-center">
            <span><AiFillAppstore /></span>
            <span className=" text-xs font-semibold">My Store</span>
          </Link>
        )
      }
      <Link to={'/more'} className=" flex flex-col items-center justify-center">
        <span><MdMoreHoriz /></span>
        <span className=" text-xs font-semibold">More</span>
      </Link>
    </Navbar>
  )
}

export default Nav