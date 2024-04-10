import {useSelector} from 'react-redux'
import { Button, Select, Table, TextInput } from 'flowbite-react'
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";

const Market = () => {

  // const { currentUser } = useSelector(state => state.user)
  const [assets, setAssets] = useState([])

  useEffect(() => {
    getAssets()
  }, [])

  console.log(assets)

  const getAssets = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/asset/getassets`)
      console.log(res)
      setAssets(res.data.allAssets)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=" min-h-screen mt-2 max-w-[1450px] w-full mx-auto md:p-4 p-3">
      <div className=" w-full flex flex-col md:flex-row gap-3 mb-7">
          <div className=" flex flex-col gap-2">
            <TextInput placeholder='Search name...' icon={AiOutlineSearch} name='name' />
          </div>
          <div className=" flex flex-col gap-2">
            <Select>
              <option value={'all'}>All</option>
              <option value={'king'}>King coconut</option>
              <option value={'chowghat'}>Chowghat Orange Dwarf</option>
              <option value={'greendwarf'}>Green Dwarf</option>
              <option value={'maypan'}>Maypan Coconut</option>
              <option value={'eastcoast'}>East coast tall coconut</option>
            </Select>
          </div>
          <div className=" flex flex-col gap-2">
            <Select>
              <option value="all">All</option>
              <option value="beginner">Beginner</option>
              <option value="pie">Pie</option>
              <option value="pulp">Pulp</option>
              <option value="sprouted">Sprouted</option>
            </Select>
          </div>
          <div className=" flex flex-col gap-2">
            <Select>
              <option value="all">All</option>
              <option value="0">0</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="75">75</option>
            </Select>
          </div>
      </div>
      <h1 className=' py-7 font-bold text-3xl'>All Assets in one Market Place</h1>
      <h1 className=' py-3 font-semibold text-2xl'>Available Assets</h1>
      <div className=" md:mx-auto scrollbar overflow-x-scroll scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {
          assets.length > 0 ? (
            <div className=' w-full'>
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>#</Table.HeadCell>
                  <Table.HeadCell>Asset</Table.HeadCell>
                  <Table.HeadCell>Value</Table.HeadCell>
                  <Table.HeadCell>Specie</Table.HeadCell>
                  <Table.HeadCell>age</Table.HeadCell>
                  <Table.HeadCell>Asset ID</Table.HeadCell>
                </Table.Head>
                
                {
                  assets.map((asset) => (
                    <Table.Body key={asset._id} className=' divide-y'>
                      <Table.Row className=' dark:border-gray-700/10 border-b-[1px]'>
                        <Table.Cell className=' text-green-600 w-1 text-xl'><AiOutlineStar /></Table.Cell>
                        <Table.Cell className=' truncate'>
                          <Link className=' flex gap-2 items-center' to={`/asset/${asset.slug}`}>
                            <img src={asset.image} alt={asset.name} className=' w-10 h-10 rounded-full' />
                            {asset.name}

                          </Link>
                        </Table.Cell>
                        <Table.Cell>
                          <Link to={`/asset/${asset.slug}`} className=' font-bold'>
                            { asset.value }
                          </Link>
                        </Table.Cell>
                        <Table.Cell>
                          <Link to={`/asset/${asset.slug}`} className=' text-lime-600'>
                            { asset.species }
                          </Link>
                        </Table.Cell>
                        <Table.Cell>
                          <Link to={`/asset/${asset.slug}`}>
                            { asset.age }
                          </Link>
                        </Table.Cell>
                        <Table.Cell>
                          <Link to={`/asset/${asset.slug}`} className=' text-cyan-500'>
                            { asset._id }
                          </Link>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  ))
                }
              </Table>
            </div>
          ) : <h1>No Available Assets</h1>
        }
      </div>
    </div>
  )
}

export default Market