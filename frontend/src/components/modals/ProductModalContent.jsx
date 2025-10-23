import { useRef } from "react";

export default function ProductModalContent({ content, mode, onSubmit, handleModalClose }) {
  let product = { cate: "", productName: "", price: "", description: "" };

  if (content) {
    product = { ...content }
  }

  const currentId = content?._id || null;

  const cateInput = useRef();
  const nameInput = useRef();
  const priceInput = useRef();
  const descriptionInput = useRef();

  const updateDate = (e) => {
    e.preventDefault();

    const newData = {
      cate: cateInput.current.value,
      productName: nameInput.current.value,
      price: priceInput.current.value,
      description: descriptionInput.current.value
    };

    onSubmit(mode, newData, currentId);
    handleModalClose();
  }

  return (
    <>
      <form className="flex flex-col mt-3 gap-3" onSubmit={updateDate}>
        <label className="w-full text-base font-medium text-gray-700 flex items-start">
          <span className="w-[100px]">Name</span>
          <textarea
            defaultValue={product.productName}
            className="border rounded grow-1 px-2 py-1"
            rows="2"
            ref={nameInput}
            required
          />
        </label>

        <label className="w-full text-base font-medium text-gray-700 flex items-start">
          <span className="w-[100px]">Category</span>
          <input
            type="text"
            defaultValue={product.cate}
            className="border rounded grow-1 px-2 py-1"
            ref={cateInput}
            required
          />
        </label>

        <label className="w-full text-base font-medium text-gray-700 flex items-start">
          <span className="w-[100px]">Price</span>
          <input
            type="number"
            defaultValue={product.price}
            className="border rounded grow-1 px-2 py-1"
            ref={priceInput}
            required
          />
        </label>

        <label className="w-full text-base font-medium text-gray-700 flex items-start">
          <span className="w-[100px]">Description</span>
          <textarea
            type="text"
            defaultValue={product.description}
            className="border rounded grow-1 px-2 py-1"
            rows={5}
            ref={descriptionInput}
            required
          />
        </label>

        <div className="flex justify-between items-center mt-2">
          <button
            type="button"
            className="px-2 py-1 bg-gray-300 rounded-lg hover:bg-gray-400 hover:cursor-pointer"
            onClick={handleModalClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  )
}