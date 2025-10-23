import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useApi from "../api/useApi.js";
import SectionHeader from "../components/shared/SectionHeader/SectionHeader";
import FaqCard from "../components/faqPage/FaqCard/FaqCard";
import FaqCardSkeleton from "../components/skeletons/FaqCardSkeleton";

export default function FaqPage({ handleModalOpen }) {
  const api = useApi();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: faqList,
    isLoading,
    error
  } = useQuery({
    queryKey: ["faqs"],
    queryFn: () => api.fetchData("questions"),
    staleTime: 1000 * 60 * 5
  });

  const filteredFaqList = searchTerm
    ? faqList.filter(q => q.q_id_name.toLowerCase().includes(searchTerm) || q.q_keywords.toLowerCase().includes(searchTerm) || q.q_question.toLowerCase().includes(searchTerm) || q.q_answer.toLowerCase().includes(searchTerm))
    : faqList;

  const queryClient = useQueryClient();

  const mutationError = (err) => {
    if (err.response?.status === 401) {
      alert("You have logged out. Please login again.");
      navigate("/login", { state: { from: location } });
    } else {
      alert(err.message);
    }
  };

  const addFaqMutation = useMutation({
    mutationFn: ({ newData }) => api.createData("questions", newData),
    onSuccess: () => {
      queryClient.invalidateQueries(["faqs"]);
    },
    onError: mutationError
  });

  const updateFaqMutation = useMutation({
    mutationFn: ({ newData, id }) => api.updateData("questions", newData, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["faqs"]);
    },
    onError: mutationError
  });

  const deleteFaqMutation = useMutation({
    mutationFn: ({ id }) => api.deleteData("questions", id),
    onSuccess: () => {
      queryClient.invalidateQueries(["faqs"]);
      alert("Item deleted successfully.");
    },
    onError: mutationError
  })

  const handleFaqSubmit = (mode, newData, id) => {
    if (mode === "Add") {
      addFaqMutation.mutate({ newData });
    } else if (mode === "Edit" && id) {
      updateFaqMutation.mutate({ newData, id });
    }
  }

  const handleFaqDelete = (id, idName) => {
    if (confirm(`Are you sure to delete Faq ${idName}?`)) {
      deleteFaqMutation.mutate({ id });
    }
  }

  return (
    <main className="section-content">
      <SectionHeader
        sectionName={"FAQs"}
        section={"questions"}
        searchTerm={searchTerm}
        onSearch={keyword => setSearchTerm(keyword)}
        onModalOpen={() => handleModalOpen("questions", "Add", null, handleFaqSubmit)}
      />
      {error && <p className="text-red-700">{error.message}</p>}
      {isLoading
        ? <div className="flex flex-col gap-6 w-full"><FaqCardSkeleton number={3} /></div>
        : (
          <div className="flex flex-col gap-6 w-full">
            {filteredFaqList?.length > 0 && filteredFaqList.map((item) => (
              <FaqCard
                key={item._id}
                item={item}
                onModalOpen={() => handleModalOpen("questions", "Edit", item, handleFaqSubmit)}
                handleFaqDelete={handleFaqDelete}
              />))
            }
          </div>
        )
      }
    </main>
  )
}