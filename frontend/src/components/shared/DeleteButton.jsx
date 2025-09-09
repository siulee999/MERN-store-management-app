import { RiDeleteBin6Line } from "react-icons/ri";

export default function DeleteButton({ onDelete }) {
  return (
    <button className="delete-btn" onClick={onDelete}>
      <RiDeleteBin6Line size={"1.3rem"}/>
      <span className="hidden sm:block">Delete</span>
    </button>
  )
}