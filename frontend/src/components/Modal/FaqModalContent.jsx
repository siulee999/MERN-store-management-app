import { useRef } from "react";

export default function FaqModalContent({ content, mode, handleModalClose, onSubmit }) {
  let faq = { q_question: "", q_answer: "", q_keywords: "" };
  if (content) {
    faq = { ...content }
  }

  const currentId = content?._id || null;

  const questionInput = useRef();
  const answerInput = useRef();
  const keywordsInput = useRef();

  const updateDate = (e) => {
    e.preventDefault();

    const newData = {
      q_question: questionInput.current.value,
      q_answer: answerInput.current.value,
      q_keywords: keywordsInput.current.value
    };

    onSubmit(mode, newData, currentId);
    handleModalClose();
  }


  return (
    <>
      <form
        className="flex flex-col mt-3 gap-3"
        onSubmit={updateDate}
      >
        <label className="w-full text-base font-medium text-gray-700 flex items-start">
          <span className="w-[100px]">Question</span>
          <input
            type="text"
            defaultValue={faq.q_question}
            className="border rounded grow-1 px-2 py-1"
            ref={questionInput}
            required
          />
        </label>

        <label className="w-full text-base font-medium text-gray-700 flex items-start">
          <span className="w-[100px]">Answer</span>
          <textarea
            defaultValue={faq.q_answer}
            className="border rounded grow-1 px-2 py-1"
            rows="6"
            ref={answerInput}
            required />
        </label>

        <label className="w-full text-base font-medium text-gray-700 flex items-start">
          <span className="w-[100px]">Keywords</span>
          <input
            type="text"
            defaultValue={faq.q_keywords}
            className="border rounded grow-1 px-2 py-1"
            ref={keywordsInput}
            required />
        </label>

        <div className="flex justify-between items-center mt-2">
          <button
            type="button"
            className="px-2 py-1 bg-gray-300 rounded-lg hover:bg-gray-400 hover:cursor-pointer"
            onClick={handleModalClose}>
            Cancel
          </button>

          <button
            type="submit"
            className="px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:cursor-pointer" >
            Submit
          </button>
        </div>
      </form>
    </>
  )
}