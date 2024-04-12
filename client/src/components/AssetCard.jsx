import { Link } from "react-router-dom"
import { BsRocketFill } from "react-icons/bs";
import {Button, Modal} from 'flowbite-react'
import { useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import {useSelector} from "react-redux"

const AssetCard = ({ asset, onDelete }) => {
  
  const [modal, setModal] = useState(false)
  const {currentUser} = useSelector(state => state.user)

  return (
    <div className=" h-[60px] md:h-[90px] max-w-[350px] w-full border border-teal-500/20 rounded-lg relative mb-5 overflow-hidden group flex shadow-md">
      <Link to={`/asset/${asset.slug}`}>
        <img src={asset.image} alt={asset.name} className=" w-[100%] h-full object-cover group-hover:mr-4 transition-all duration-300" />
      </Link>
      <div className=" flex flex-col justify-between pt-1  border-l-[1px] border-r-[1px] w-[50%] truncate">
        <div className=" px-1">
          <p className=" font-bold truncate text-xs">{ asset.name }</p>
          <p className=" font-semibold text-[12px]">Specie:<span className=" ml-1">{asset.species}</span></p>
        </div>
        <div className=" w-full text-[9px] p-1 text-center bg-cyan-500 text-white">{ asset._id }</div>
      </div>
      <div className=" px-2 pb-2 border-t-[1px] border-teal-500/25 flex flex-col items-end justify-end gap-2 w-[25%]">
        <p className=" italic text-xs">{asset.age} { asset.age <= 1 ? 'day' : 'days' }</p>
        <p className=" italic text-xs flex items-center gap-1"> <span className=" text-green-500"><BsRocketFill /></span>#{ asset.value }</p>
      </div>
      {
        currentUser && currentUser.isAdmin && (

          <div className=" text-white font-semibold top-[-200px] text-sm absolute group-hover:top-[50%] group-hover:left-[50%] group-hover:translate-x-[-50%] group-hover:translate-y-[-50%] w-[200px] text-center p-1 rounded-lg transition-all duration-300">
            <Button className=" w-full" color={'red'} size={'xs'} onClick={() => setModal(true)}><MdDeleteForever className=" w-4 h-4" /> Delete</Button>
          </div>
        )
      }

      {
        modal && (
          <Modal show={modal} size='md' onClose={() => setModal(false)} popup >
            <Modal.Header />
            <Modal.Body>
              <BsExclamationCircle className=" mx-auto text-gray-700 dark:text-green-200 h-10 w-10 mb-5" />
              <h2 className=" mb-6 text-lg font-normal text-gray-500 dark:text-gray-400 text-center">Do you really want to Delete this Asset?</h2>
              <div className=" flex justify-center gap-6">
                <Button color={'gray'} onClick={() => setModal(false)}>No, cancel</Button>
                <Button color={'failure'} onClick={() => { 
                  onDelete(asset._id)
                  setModal(false)
                }}>Yes, Delete</Button>
              </div>
            </Modal.Body>
          </Modal>
        )
      }
    </div>
  )
}

export default AssetCard