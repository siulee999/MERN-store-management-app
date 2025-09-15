import SectionHeader from "../components/SectionHeader/SectionHeader";
import StoreCard from "../components/StoreCard/StoreCard";
import { useState } from "react";
import useApi from "../api/useApi";
import { useLocation, useNavigate } from "react-router-dom";
import StoreCardSkeleton from "../components/Skeletons/StoreCardSkeleton";

export default function StorePage({ handleModalOpen }) {
  const api = useApi();
  const navigate = useNavigate();
  const location = useLocation();

  const [storeList, setStoreList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleStoreSubmit(mode, newData, id) {
    try {
      setIsLoading(true);
      if (mode === "Add") {
        const created = await api.createData("shops", newData);
        setStoreList((prev) => [created, ...prev]);

      } else if (mode === "Edit" && id) {
        const updated = await api.updateData("shops", id, newData);
        setStoreList((prev) => prev.map(item => item._id === id ? updated : item));
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

  async function handleStoreDelete(id, idName) {
    try {
      setIsLoading(true);

      if (confirm(`Are you sure to delete Store ${idName}?`)) {
        await api.deleteData("shops", id);
        setStoreList((prev) => prev.filter(item => item._id != id));
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

  async function handleStoreSearch(keyword) {
    try {
      setIsLoading(true);

      const result = await api.searchData("shops", keyword);

      setStoreList(result);

    } catch (err) {
      setErrorMsg(err.message);
      console.log(err);

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="section-content">
      <SectionHeader sectionName={"Stores"} section={"shops"} onSearch={handleStoreSearch} onModalOpen={() => handleModalOpen("shops", "Add", null, handleStoreSubmit)} />
      {
        errorMsg && <p className="text-red-700">{errorMsg}</p>
      }
      {
        isLoading
          ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"><StoreCardSkeleton number={6}/></div>
          : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {
                storeList?.map((item) => (
                  <StoreCard key={item._id} item={item} onModalOpen={() => handleModalOpen("shops", "Edit", item, handleStoreSubmit)} handleStoreDelete={handleStoreDelete} />
                ))
              }
            </div>
          )
      }
    </div>
  )
}