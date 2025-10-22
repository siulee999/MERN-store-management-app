import DeleteButton from "../../shared/DeleteButton";
import EditButton from "../../shared/EditButton";

export default function FaqCard({ item, onModalOpen, handleFaqDelete }) {
  return (
    <div className="shadow-lg flex flex-col gap-2 p-4 rounded-lg hover:bg-gray-50">
      <p className="font-bold text-lg">{item.q_id_name}: {item.q_question}</p>
      <p>A: {item.q_answer}</p>
      <p className="text-gray-600">關鍵字： {item.q_keywords}</p>
      <div className="flex gap-2">
        <EditButton onModalOpen={onModalOpen} />
        <DeleteButton onDelete={() => handleFaqDelete(item._id, item.q_id_name)} />
      </div>
    </div>
  )
}