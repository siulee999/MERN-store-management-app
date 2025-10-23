import FaqModalContent from "./FaqModalContent.jsx";
import ProductModalContent from "./ProductModalContent.jsx";
import StoreModalContent from "./StoreModalContent.jsx";

export default function Modal({ modal, handleModalClose }) {
  const { section, mode, content, onSubmit } = modal;

  return (
    <div className="fixed inset-0 z-[99] bg-black/30 flex flex-col justify-center items-center px-2">
      <div className="bg-gray-100 w-full sm:max-w-[500px] py-3 px-5 rounded-lg">
        <h2 className="text-xl font-bold">
          {mode}
          {section === "products" && "Product" || (
            section === "shops" && "Store" || (
              section === "questions" && "FAQ"
            ))}
        </h2>

        {section === "products" && <ProductModalContent content={content} mode={mode} onSubmit={onSubmit} handleModalClose={handleModalClose} />}
        {section === "shops" && <StoreModalContent content={content} mode={mode} onSubmit={onSubmit} handleModalClose={handleModalClose} />}
        {section === "questions" && <FaqModalContent content={content} mode={mode} onSubmit={onSubmit} handleModalClose={handleModalClose} />}
      </div>
    </div>
  )
}