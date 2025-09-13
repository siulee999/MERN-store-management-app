import DeleteButton from "../shared/DeleteButton";
import EditButton from "../shared/EditButton";

export default function ProductTableRow({item, handleProductDelete, onModalOpen }) {
  
  return (
    <tr className="hover:bg-gray-50">
      <td className="td">{item.productIdName}</td>
      <td className="td">{item.productName}</td>
      <td className="td">{item.cate}</td>
      <td className="td">${item.price}</td>
      <td className="td">{item.description}</td>
      <td className="td">
        <div className="flex flex-col gap-2">
          <EditButton onModalOpen={onModalOpen}/>
          <DeleteButton onDelete={() => handleProductDelete(item._id, item.productIdName)}/>          
        </div>

      </td>
    </tr>
  )
}