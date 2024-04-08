import {Button, FileInput, Select, TextInput} from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const GenerateAssets = () => {
  return (
    <div className=" min-h-screen max-w-2xl mx-auto">
      <h1 className=" text-3xl font-semibold text-center py-4">The coconut Factory</h1>
      <form className=" flex flex-col gap-4 p-3">
        <div className=" flex flex-col sm:flex-row gap-4 flex-1 justify-center sm:items-end">
          <div className=" flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <TextInput placeholder='Asset name goes here' name='name' />
          </div>
          <div className=" flex flex-col gap-2">
            <label htmlFor="specie">Specie</label>
            <Select>
              <option value={'king'}>King coconut</option>
              <option value={'chowghat'}>Chowghat Orange Dwarf</option>
              <option value={'greendwarf'}>Green Dwarf</option>
              <option value={'maypan'}>Maypan Coconut</option>
              <option value={'eastcoast'}>East coast tall coconut</option>
            </Select>
          </div>
          <div className=" flex flex-col gap-2">
            <label htmlFor="stage">Stage</label>
            <Select>
              <option value="beginner">Beginner</option>
              <option value="pie">Pie</option>
              <option value="pulp">Pulp</option>
              <option value="sprouted">Sprouted</option>
            </Select>
          </div>
          <div className=" flex flex-col gap-2">
            <label htmlFor="age">Age</label>
            <Select>
              <option value="0">0</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="75">75</option>
            </Select>
          </div>
          <div className=" flex flex-col gap-2">
            <label htmlFor="value">Set Value</label>
            <TextInput type='number' placeholder='0.00' name='value'/>
          </div>
        </div>
        <div className=" flex items-center justify-between border-b-[1px] border-teal-500 py-2">
          <FileInput required type="file" accept='image/*' />
          <Button type='button' gradientDuoTone={'cyanToBlue'}>Upload</Button>
        </div>
        <ReactQuill required theme="snow" className=' h-72 mb-20' placeholder='Describe this asset...' />
        <Button type='submit' gradientDuoTone={'greenToBlue'}>Generate Asset</Button>
      </form>
    </div>
  )
}

export default GenerateAssets