import DeleteButton from "../shared/DeleteButton";
import EditButton from "../shared/EditButton";

export default function StoreCard({item, onModalOpen, handleStoreDelete}) {
  
  return (
    <div className="shadow-lg rounded-lg product-card overflow-x-auto hover:bg-gray-50">
      <div className="flex flex-col justify-between h-full">
        <div>        
          <p className="text-lg font-bold text-white bg-primary w-full py-2 px-3">{item.shopIdName}</p>
          <div className="px-3"> 
            <p className="text-xl font-bold py-2">{item.shopName}</p>
            <p>Address: {item.address}</p>
            <p>Opening Hour: {item.openingHour}</p>
            <p>Latitude: {item.latitude}</p>
            <p>Longitude: {item.longitude}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 py-3 px-3">
          <EditButton onModalOpen={onModalOpen}/>
          <DeleteButton onDelete={() => handleStoreDelete(item._id, item.shopIdName)}/>
        </div>
      </div>
    </div>
  )
}