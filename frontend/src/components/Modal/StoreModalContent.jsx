import { useRef } from "react";

export default function StoreModalContent({ content, mode, onSubmit, handleModalClose }) {
  let store = {shopName: "", address: "", openingHour: "", latitude: "", longitude: ""};

  if (content) {
    store = {...content}
  }
  
  const currentId = content?._id || null;

  const nameInput = useRef();
  const addressInput = useRef();
  const openingHourInput = useRef();
  const latInput = useRef();
  const lonInput = useRef();

  function updateDate(e){
    e.preventDefault();

    const newData = {
      shopName: nameInput.current.value,
      address: addressInput.current.value,
      openingHour: openingHourInput.current.value,
      latitude: latInput.current.value,
      longitude: lonInput.current.value
    };

    onSubmit(mode, newData, currentId);
    handleModalClose();
  }


  return (
    <>
      <form className="flex flex-col mt-3 gap-3" onSubmit={updateDate}>
        <label className="w-full text-base font-medium text-gray-700 flex items-start">
          <span className="w-[120px]">Store Name</span>
          <input 
            type="text" 
            defaultValue={store.shopName} 
            className="border rounded grow-1 px-2 py-1" 
            ref={nameInput}
            required />
        </label>

        <label className="w-full text-base font-medium text-gray-700 flex items-start">
          <span className="w-[120px]">Address</span>
          <textarea 
            defaultValue={store.address} 
            className="border rounded grow-1 px-2 py-1" 
            rows="2" 
            ref={addressInput}
            required />
        </label>

        <label className="w-full text-base font-medium text-gray-700 flex items-start">
          <span className="w-[120px]">Opening Hour</span>
          <input 
            type="text" 
            defaultValue={store.openingHour} 
            className="border rounded grow-1 px-2 py-1" 
            ref={openingHourInput}
            required />
        </label>

        <label className="w-full text-base font-medium text-gray-700 flex items-start">
          <span className="w-[120px]">Latitude</span>
          <input 
            type="number" 
            defaultValue={store.latitude} 
            className="border rounded grow-1 px-2 py-1" 
            ref={latInput}
            required />
        </label>

        <label className="w-full text-base font-medium text-gray-700 flex items-start">
          <span className="w-[120px]">Longitude</span>
          <input 
            type="number" 
            defaultValue={store.longitude} 
            className="border rounded grow-1 px-2 py-1" 
            ref={lonInput}
            required />
        </label>

        <div className="flex justify-between items-center mt-2">
          <button 
            type="button"
            className="px-2 py-1 bg-gray-300 rounded-lg hover:bg-gray-400 hover:cursor-pointer" 
            onClick={handleModalClose}>
              Cancel
          </button>

          <button
            type="submit"
            className="px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:cursor-pointer" >
              Submit
          </button>
        </div>
      </form>
    </>
  )
}