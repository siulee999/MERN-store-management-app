import { FaRegEdit } from "react-icons/fa";

export default function EditButton({ onModalOpen }) {
  return (
    <button className="edit-btn" onClick={onModalOpen}>
      <FaRegEdit size={20}/>
      <span className="hidden sm:block">Edit</span>
    </button>
  )
}