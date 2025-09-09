import FaqModalContent from "./FaqModalContent";
import ProductModalContent from "./ProductModalContent";
import StoreModalContent from "./StoreModalContent";

export default function Modal({modal, handleModalClose, handleSubmit}) {
  const { section, mode, content } = modal;

  return (
    <div className="fixed inset-0 z-[99] bg-black/30 flex flex-col justify-center items-center px-2">
      <div className="bg-gray-100 w-full sm:max-w-[500px] py-3 px-5 rounded-lg">
        <h2 className="text-xl font-bold">{mode} {
          section === "products" && "Product" || (
            section ==="shops" && "Store" || (
              section === "questions" && "FAQ"
          ))}</h2>

        {section === "products" && <ProductModalContent content={content} handleModalClose={handleModalClose} handleSubmit={handleSubmit}/>}
        {section === "shops" && <StoreModalContent content={content} handleModalClose={handleModalClose} handleSubmit={handleSubmit}/>}
        {section === "questions" && <FaqModalContent content={content} handleModalClose={handleModalClose} handleSubmit={handleSubmit}/>}
      </div>
    </div>
  )
}