import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

export default function SectionHeader({ section, search, sectionName, onModalOpen}) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    search(section, searchTerm);
  }, [searchTerm]);

  return (
    <div className='flex justify-between items-center mb-4 w-full h-10'>
      <h3 className='text-2xl text-primary font-bold'>{sectionName}</h3>

      <div className='flex-grow min-w-0 max-w-100 h-full mx-3 relative'>
        <input 
          placeholder='Search' 
          className='border border-gray-100 rounded-3xl h-full w-full pl-9 pr-5 shadow-inner outline-0 focus:shadow-sm'
          onChange={(e) => {setSearchTerm(e.target.value)}}
          />
        <div className='absolute left-0 top-0 h-full p-2 text-gray-700'>
          <IoSearch size={"1.5rem"}/>
        </div>
      </div>

      <button className={`add-btn add-${sectionName.toLowerCase()}`} onClick={onModalOpen}>
        <span className='text-2xl mb-1'>+</span>
        <span className='hidden sm:block'>Add</span>
      </button>
    </div>
  )
}