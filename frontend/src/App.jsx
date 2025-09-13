import { useState } from "react"
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom"

import useAuth from "./hooks/useAuth"
import useRefreshToken from './api/useRefreshToken'

import ProductPage from "./pages/ProductPage"
import StorePage from "./pages/StorePage"
import FaqPage from "./pages/FaqPage"
import LoginPage from "./pages/LoginPage"
import NavbarLayout from "./components/NavbarLayout/NavbarLayout"
import Modal from "./components/Modal/Modal"


function App() {
  console.log("app running");
  // const api = useApi();
  const navigate = useNavigate();
  const location = useLocation();

  const { auth, setAuth } = useAuth();
  const refresh = useRefreshToken();

  // const [productList, setProductList] = useState([]);
  // const [storeList, setStoreList] = useState([]);
  // const [faqList, setFaqList] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpened, SetIsModalOpened] = useState(false);
  const [modal, setModal] = useState({ section: null, mode: null, content: null, onSubmit: null });


  function handleModalOpen(section, mode, content = null, onSubmit) {

    if (auth.token) {
      setModal({ section, mode, content, onSubmit });
      SetIsModalOpened(true);
    } else {
      navigate("/login", { state: { from: location } });
      alert("Please login for further operations.");
    }
  }

  function handleModalClose() {
    SetIsModalOpened(false);
    setModal({ section: null, mode: null, content: null, onSubmit: null });
  }

  // async function handleSubmit(newData, currentId) {
  //   try {
  //     setIsLoading(true);

  //     if (modal.mode === "Add") {
  //       const created = await api.createData(modal.section, newData);

  //       if (modal.section === "products") {
  //         setProductList((prev) => [created, ...prev]);
  //       } else if (modal.section === "questions") {
  //         setFaqList((prev) => [created, ...prev]);
  //       } else if (modal.section === "store") {
  //         setStoreList((prev) => [created, ...prev]);
  //       }

  //     } else if (modal.mode === "Edit" && currentId) {

  //       const updated = await api.updateData(modal.section, currentId, newData);

  //       if (modal.section === "products") {
  //         setProductList((prev) => { prev.map(item => item._id === currentId ? updated : item)});
  //       } else if (modal.section === "questions") {
  //         setFaqList((prev) => { prev.map(item => item._id === currentId ? updated : item)});
  //       } else if (modal.section === "shops") {
  //         setStoreList((prev) => { prev.map(item => item._id === currentId ? updated : item)});
  //       }
  //     }

  //   } catch (err) {
  //     if (err.response?.status === 401) {
  //       alert("You have logged out. Please login again.");
  //       navigate("/login", { state: { from: location } });
  //     } else {
  //       alert("Something went wrong. Please try again.");
  //       setErrorMessage(err.message);
  //       console.log(err);
  //     }

  //   } finally {
  //     SetIsModalOpened(false);
  //     setIsLoading(false);
  //   }

  // }

  // async function handleDelete(section, id) {
  //   try {
  //     setIsLoading(true);

  //     if (confirm("Are you sure to delete the item ?")) {
  //       await api.deleteData(section, id);
  //       alert("Item deleted successfully.");
  //     }

  //   } catch (err) {
  //     if (err.response?.status === 401) {
  //       alert("You have logged out. Please login again.");
  //       navigate("/login", { state: { from: location } });
  //     } else {
  //       setErrorMessage(err.message);
  //       console.log(err);
  //       alert("Something went wrong. Please try again.");
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // async function search(section, searchTerm) {
  //   try {
  //     const found = await api.searchData(section, searchTerm);

  //     if (section === "products") {
  //       setProductList(found.reverse());
  //     } else if (section === "shops") {
  //       setStoreList(found.reverse());
  //     } else if (section === "questions") {
  //       setFaqList(found.reverse());
  //     }

  //   } catch (err) {
  //     setErrorMessage(err.message);
  //     console.log(err);
  //   } 
  // }

  // useEffect(() => {
  //   async function fetchAllData() {
  //     try {
  //       setIsLoading(true);

  //       const [products, faqs, stores] = await Promise.all([
  //         api.fetchData("products"),
  //         api.fetchData("questions"),
  //         api.fetchData("shops")
  //       ]);

  //       setProductList([...products].reverse());
  //       setFaqList(faqs);
  //       setStoreList(stores);

  //     } catch (err) {
  //       setErrorMessage(err.message);
  //       console.log(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchAllData();
  // }, []);

  // useEffect(() => {
  //   async function persistLogin() {
  //     try {
  //       setIsLoading(true);
  //       const token = await refresh();
  //       if (token) {
  //         setAuth({ token });
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       setErrorMessage(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   persistLogin();
  // }, []);


  if (errorMessage) {
    return <div className="font-bold m-2">{errorMessage}. Please try again.</div>
  }

  if (isLoading) {
    return <div className="font-bold m-2">Loading...Please wait.</div>
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<NavbarLayout />}>
          <Route path="/products" element={<ProductPage handleModalOpen={handleModalOpen} />} />
          <Route path="/stores" element={<StorePage handleModalOpen={handleModalOpen} />} />
          <Route path="/faqs" element={<FaqPage handleModalOpen={handleModalOpen} />} />
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Route>
      </Routes>

      { isModalOpened && <Modal modal={modal} handleModalClose={handleModalClose} />}
    </>

  )
}

export default App
