import SectionHeader from "../components/SectionHeader/SectionHeader";
import FaqCard from "../components/FaqCard/FaqCard";
import { useState } from "react";
import useApi from "../api/useApi";
import { useLocation, useNavigate } from "react-router-dom";
import FaqCardSkeleton from "../components/Skeletons/FaqCardSkeleton";

export default function FaqPage({ handleModalOpen }) {
  const api = useApi();
  const navigate = useNavigate();
  const location = useLocation();

  const [faqList, setFaqList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleFaqSubmit(mode, newData, id) {
    try {
      setIsLoading(true);
      if (mode === "Add") {
        const created = await api.createData("questions", newData);
        setFaqList((prev) => [created, ...prev]);

      } else if (mode === "Edit" && id) {
        const updated = await api.updateData("questions", id, newData);
        setFaqList((prev) => prev.map(item => item._id === id ? updated : item));
      }

    } catch (err) {
      if (err.response?.status === 401) {
        alert("You have logged out. Please login again.");
        navigate("/login", { state: { from: location } });
      } else {
        setErrorMsg(err.message);
        console.log(err);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFaqDelete(id, idName) {
    try {
      setIsLoading(true);

      if (confirm(`Are you sure to delete FAQ ${idName}?`)) {
        await api.deleteData("questions", id);
        setFaqList((prev) => prev.filter(item => item._id != id))
        alert("Item deleted successfully.");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        alert("You have logged out. Please login again.");
        navigate("/login", { state: { from: location } });
      } else {
        setErrorMsg(err.message);
        console.log(err);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFaqSearch(keyword) {
    try {
      setIsLoading(true);

      const result = await api.searchData("questions", keyword);
      setFaqList(result);

    } catch (err) {
      setErrorMsg(err.message);
      console.log(err);

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="section-content">
      <SectionHeader sectionName={"FAQs"} section={"questions"} onSearch={handleFaqSearch} onModalOpen={() => handleModalOpen("questions", "Add", null, handleFaqSubmit)} />
      {
        errorMsg && <p className="text-red-700">{errorMsg}</p>
      }
      {
        isLoading
          ? <div className="flex flex-col gap-6 w-full"><FaqCardSkeleton number={3} /></div>
          : (
            <div className="flex flex-col gap-6 w-full">
              {
                faqList?.map((item) => (
                  <FaqCard key={item._id} item={item} onModalOpen={() => handleModalOpen("questions", "Edit", item, handleFaqSubmit)} handleFaqDelete={handleFaqDelete} />
                ))
              }
            </div>
          )
      }
    </div>
  )
}