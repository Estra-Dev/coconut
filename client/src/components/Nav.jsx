import { Navbar } from "flowbite-react"
import { Link } from "react-router-dom"
import { MdMoreHoriz } from "react-icons/md";
import { RiHomeLine } from "react-icons/ri";

const Nav = () => {
  return (
    <Navbar className=" px-8 sticky bottom-0 border-t-2">
      <Link to={'/'} className=" flex flex-col items-center justify-center">
        <span><RiHomeLine /></span>
        <span className=" text-xs font-semibold">Home</span>
      </Link>
      <Link to={'/more'} className=" flex flex-col items-center justify-center">
        <span><MdMoreHoriz /></span>
        <span className=" text-xs font-semibold">More</span>
      </Link>
    </Navbar>
  )
}

export default Nav