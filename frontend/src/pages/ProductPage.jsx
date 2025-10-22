import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleProductSubmit = async (mode, newData, id) => {
    try {
      setIsLoading(true);
      if (mode === "Add") {
        const created = await api.createData("products", newData);
        setProductList((prev) => [created, ...prev]);

      } else if (mode === "Edit" && id) {
        const updated = await api.updateData("products", id, newData);
        setProductList((prev) => prev.map(item => item._id === id ? updated : item));
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

  const handleProductDelete = async (id, idName) => {
    try {
      setIsLoading(true);

      if (confirm(`Are you sure to delete Product ${idName}?`)) {
        await api.deleteData("products", id);
        setProductList((prev) => prev.filter(item => item._id != id));
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

  const handleProductSearch = async (keyword) => {
    try {
      setIsLoading(true);

      const result = await api.searchData("products", keyword);
      setProductList(result);

    } catch (err) {
      setErrorMsg(err.message);
      console.log(err);

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className='section-content'>
      <SectionHeader
        sectionName={"Products"}
        section={"products"}
        onSearch={handleProductSearch}
        onModalOpen={() => { handleModalOpen("products", "Add", null, handleProductSubmit) }}
      />
      {errorMsg && <p className="text-red-700">{errorMsg}</p>}
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
              {productList?.length > 0 && productList.map((item) => (
                <ProductCard
                  key={item._id}
                  item={item}
                  handleProductDelete={handleProductDelete}
                  onModalOpen={() => handleModalOpen("products", "Edit", item, handleProductSubmit)}
                />))
              }
            </div>

            {/* Tablet and Desktop View */}
            {productList?.length > 0 && (
              <div className='hidden sm:block bg-white rounded-lg shadow-lg overflow-x-auto w-full'>
                <ProductTable
                  productList={productList}
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