import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "../api/useApi";
import SectionHeader from '../components/shared/SectionHeader/SectionHeader.jsx';
import ProductCard from '../components/productPage/ProductCard/ProductCard.jsx';
import ProductTable from '../components/productPage/ProductTable/ProductTable.jsx';
import ProductCardSkeleton from '../components/skeletons/ProductCardSkeleton.jsx';
import ProductTableSkeleton from '../components/skeletons/ProductTableSkeleton.jsx';

export default function ProductPage({ handleModalOpen }) {
  const api = useApi();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: productList,
    isLoading,
    error
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => api.fetchData("products"),
    staleTime: 1000 * 60 * 5
  });

  const filteredProductList = searchTerm
    ? productList.filter(p => p.productIdName.includes(searchTerm) || p.productName.toLowerCase().includes(searchTerm) || p.description.toLowerCase().includes(searchTerm))
    : productList;


  const queryClient = useQueryClient();

  const mutationError = (err) => {
    if (err.response?.status === 401) {
      alert("You have logged out. Please login again.");
      navigate("/login", { state: { from: location } });
    } else {
      alert(err.message);
    }
  };

  const addProductMutation = useMutation({
    mutationFn: ({ newData }) => api.createData("products", newData),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
    onError: mutationError
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ newData, id }) => api.updateData("products", newData, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
    onError: mutationError
  });

  const deleteProductMutation = useMutation({
    mutationFn: ({ id }) => api.deleteData("products", id),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      alert("Item deleted successfully.");
    },
    onError: mutationError
  });

  const handleProductSubmit = (mode, newData, id) => {
    if (mode === "Add") {
      addProductMutation.mutate({ newData });
    } else if (mode === "Edit" && id) {
      updateProductMutation.mutate({ newData, id });
    }
  };

  const handleProductDelete = (id, idName) => {
    if (confirm(`Are you sure to delete Product ${idName}?`)) {
      deleteProductMutation.mutate({ id });
    }
  };

  return (
    <main className='section-content'>
      <SectionHeader
        sectionName={"Products"}
        section={"products"}
        searchTerm={searchTerm}
        onSearch={keyword => setSearchTerm(keyword)}
        onModalOpen={() => { handleModalOpen("products", "Add", null, handleProductSubmit) }}
      />
      {error && <p className="text-red-700">{error.message}</p>}
      {isLoading
        ? (
          <>
            {/* Mobile view */}
            <div className="sm:hidden flex flex-col gap-6 w-full">
              <ProductCardSkeleton number={3} />
            </div>

            {/* Tablet and Desktop view */}
            <div className='hidden sm:block bg-white rounded-lg shadow-lg overflow-x-auto w-full'>
              <ProductTableSkeleton rowNumber={3} />
            </div>
          </>
        )
        : (
          <>
            {/* Mobile View */}
            <div className='sm:hidden flex flex-col gap-6 w-full'>
              {filteredProductList?.length > 0 && filteredProductList.map((item) => (
                <ProductCard
                  key={item._id}
                  item={item}
                  handleProductDelete={handleProductDelete}
                  onModalOpen={() => handleModalOpen("products", "Edit", item, handleProductSubmit)}
                />))
              }
            </div>

            {/* Tablet and Desktop View */}
            {filteredProductList?.length > 0 && (
              <div className='hidden sm:block bg-white rounded-lg shadow-lg overflow-x-auto w-full'>
                <ProductTable
                  filteredProductList={filteredProductList}
                  handleProductDelete={handleProductDelete}
                  handleModalOpen={handleModalOpen}
                  handleProductSubmit={handleProductSubmit}
                />
              </div>)
            }
          </>
        )
      }
    </main>
  )
}