import DeleteButton from "../shared/DeleteButton";
import EditButton from "../shared/EditButton";

export default function ProductCard({item, onModalOpen, handleProductDelete}) {
  
  return (
    <div className="shadow-md rounded-lg product-card">
      <div className='flex justify-between items-center rounded-t-lg py-2 px-3 bg-primary text-gray-100'>
        <span className="font-bold">{item.productIdName}</span>
        <div className="flex justify-center items-center gap-2">
          <EditButton onModalOpen={onModalOpen}/>
          <DeleteButton onDelete={() => handleProductDelete(item._id, item.productIdName)}/>
        </div>
      </div>

      <div className="px-2">
        <table>
          <tbody>
            <tr className="border-b border-gray-200">
              <th className="text-left font-bold text-gray-700 p-1 pt-2">Name</th>
              <td className="p-1 pt-2">{item.productName}</td>              
            </tr>

            <tr className="border-b border-gray-200">
              <th className="text-left font-bold text-gray-700 p-1">Category</th>
              <td className="p-1">{item.cate}</td>
            </tr>

            <tr className="border-b border-gray-200">
              <th className="text-left font-bold text-gray-700 p-1">Price</th>
              <td className="p-1">${item.price}</td>
            </tr>

            <tr className="border-b border-gray-200">
              <th className="text-left font-bold text-gray-700 p-1 pb-2">Description</th>
              <td className="p-1 pb-2">{item.description}</td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  )
}