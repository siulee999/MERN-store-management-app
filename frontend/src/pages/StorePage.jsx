import SectionHeader from "../components/sectionHeader/sectionHeader";
import StoreCard from "../components/StoreCard/StoreCard";

export default function StorePage({ storeList, search, handleModalOpen, handleDelete }) {

  return (
    <div className="section-content">
      <SectionHeader sectionName={"Stores"} section={"shops"} search={search} onModalOpen={() => handleModalOpen("shops", "Add")}/>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          storeList?.map((item) => (
            <StoreCard key={crypto.randomUUID()} item={item} onModalOpen={() => handleModalOpen("shops", "Edit", item)} handleDelete={handleDelete}/>
          ))
        }
      </div>
    </div>
  )
}