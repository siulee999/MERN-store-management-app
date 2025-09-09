import SectionHeader from '../components/sectionHeader/sectionHeader.jsx'
import ProductCard from '../components/ProductCard/ProductCard.jsx'
import ProductTable from '../components/ProductTable/ProductTable.jsx'

export default function ProductPage({ productList, search, handleModalOpen, handleDelete }) {

  return (
    <div className='section-content'>
      <SectionHeader sectionName={"Products"} section={"products"} search={search} onModalOpen={() => { handleModalOpen("products", "Add") }} />

      <div className='sm:hidden flex flex-col gap-6 w-full'>
        {
          productList?.map((item) => (
            <ProductCard key={crypto.randomUUID()} item={item} handleDelete={handleDelete} onModalOpen={() => handleModalOpen("products", "Edit", item)} />
          ))
        }
      </div>

      {
        productList?.length > 0 && (
          <div className='hidden sm:block bg-white rounded-lg shadow-lg overflow-x-auto w-full'>
            <ProductTable productList={productList} handleDelete={handleDelete} handleModalOpen={handleModalOpen} />
          </div>
        )
      }

    </div>
  )
}