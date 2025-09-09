import ProductTableRow from "./ProductTableRow"
import './ProductTable.css'

export default function ProductTable({ productList, handleDelete, handleModalOpen }) {
  
  return (
    <table className="border-collapse">
      <thead className='bg-primary'>
        <tr className='text-gray-100'>
          <th className='td'>ID</th>
          <th className='td'>Product Name</th>
          <th className='td'>Category</th>
          <th className='td'>Price</th>
          <th className='td'>Description</th>
          <th className='td'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          productList?.map((item) => (
            <ProductTableRow item={item} key={crypto.randomUUID()} handleDelete={handleDelete} onModalOpen={() => handleModalOpen("products", "Edit", item)}/>
          ))
        }
      </tbody>
    </table>
  )
}