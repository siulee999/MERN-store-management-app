import SectionHeader from "../components/SectionHeader/SectionHeader";
import FaqCard from "../components/FaqCard/FaqCard";

export default function FaqPage({faqList, search, handleModalOpen, handleDelete}) {

  return (
    <div className="section-content">
      <SectionHeader sectionName={"FAQs"} section={"questions"} search={search} onModalOpen={() => handleModalOpen("questions", "Add")} />
      <div className="flex flex-col gap-6 w-full">
        {
          faqList?.map((item) => (
            <FaqCard key={crypto.randomUUID()} item={item} onModalOpen={() => handleModalOpen("questions", "Edit", item)} handleDelete={handleDelete}/>
          ))
        }
      </div>
    </div>
  )
}