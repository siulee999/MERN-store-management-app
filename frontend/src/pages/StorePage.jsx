import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useApi from "../api/useApi.js";
import SectionHeader from "../components/shared/SectionHeader/SectionHeader";
import StoreCard from "../components/storePage/StoreCard/StoreCard";
import StoreCardSkeleton from "../components/loadingSkeletons/StoreCardSkeleton.jsx";


export default function StorePage({ handleModalOpen }) {
  const api = useApi();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: storeList,
    isLoading,
    error
  } = useQuery({
    queryKey: ["store"],
    queryFn: () => api.fetchData("shops"),
    staleTime: 1000 * 60 * 5
  });

  const filteredStoreList = searchTerm
    ? storeList.filter(s => s.shopIdName.toLowerCase().includes(searchTerm) || s.address.toLowerCase().includes(searchTerm) || s.shopName.toLowerCase().includes(searchTerm))
    : storeList;


  const queryClient = useQueryClient();

  const mutationError = (err) => {
    if (err.response?.status === 401) {
      alert("You have logged out. Please login again.");
      navigate("/login", { state: { from: location } });
    } else {
      alert(err.message);
    }
  };

  const addStoreMutation = useMutation({
    mutationFn: ({ newData }) => api.createData("shops", newData),
    onSuccess: () => {
      queryClient.invalidateQueries(["stores"]);
    },
    onError: mutationError
  });

  const updateStoreMutation = useMutation({
    mutationFn: ({ newData, id }) => api.updateData("shops", newData, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["stores"]);
    },
    onError: mutationError
  });

  const deleteStoreMutation = useMutation({
    mutationFn: ({ id }) => api.deleteData("shops", id),
    onSuccess: () => {
      queryClient.invalidateQueries(["stores"]);
      alert("Item deleted successfully.");
    },
    onError: mutationError
  })

  const handleStoreSubmit = (mode, newData, id) => {
    if (mode === "Add") {
      addStoreMutation.mutate({ newData });
    } else if (mode === "Edit" && id) {
      updateStoreMutation.mutate({ newData, id });
    }
  }

  const handleStoreDelete = (id, idName) => {
    if (confirm(`Are you sure to delete Store ${idName}?`)) {
      deleteStoreMutation.mutate({ id });
    }
  }

  return (
    <main className="section-content">
      <SectionHeader
        sectionName={"Stores"}
        section={"shops"}
        onSearch={(keyword) => setSearchTerm(keyword)}
        searchTerm={searchTerm}
        onModalOpen={() => handleModalOpen("shops", "Add", null, handleStoreSubmit)}
      />
      {error && <p className="text-red-700">{error.message}</p>}
      {isLoading
        ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            <StoreCardSkeleton number={6} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStoreList?.length > 0 && filteredStoreList.map((item) => (
              <StoreCard
                key={item._id}
                item={item}
                onModalOpen={() => handleModalOpen("shops", "Edit", item, handleStoreSubmit)}
                handleStoreDelete={handleStoreDelete}
              />))
            }
          </div>
        )
      }
    </main>
  )
}