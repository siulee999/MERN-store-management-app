import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

import useAuth from "./hooks/useAuth.js";
import useRefreshToken from './api/useRefreshToken.js';

import ProductPage from "./pages/ProductPage";
import StorePage from "./pages/StorePage";
import FaqPage from "./pages/FaqPage";
import LoginPage from "./pages/LoginPage";
import OverviewPage from "./pages/OverviewPage";
import NavbarLayout from "./components/shared/NavbarLayout/NavbarLayout";
import Modal from "./components/modals/Modal.jsx";


export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const { auth, setAuth } = useAuth();
  const refresh = useRefreshToken();

  const [isModalOpened, SetIsModalOpened] = useState(false);
  const [modal, setModal] = useState({ section: null, mode: null, content: null, onSubmit: null });


  const handleModalOpen = (section, mode, content = null, onSubmit) => {
    if (auth.token) {
      setModal({ section, mode, content, onSubmit });
      SetIsModalOpened(true);
    } else {
      navigate("/login", { state: { from: location } });
      alert("Please login for further operations.");
    }
  }

  const handleModalClose = () => {
    SetIsModalOpened(false);
    setModal({ section: null, mode: null, content: null, onSubmit: null });
  }

  useEffect(() => {
    const persistLogin = async () => {
      try {
        const token = await refresh();
        if (token) {
          setAuth({ token });
        }
      } catch (err) {
        console.log(err);
      } 
    }

    persistLogin();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<NavbarLayout />}>
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/products" element={<ProductPage handleModalOpen={handleModalOpen} />} />
          <Route path="/stores" element={<StorePage handleModalOpen={handleModalOpen} />} />
          <Route path="/faqs" element={<FaqPage handleModalOpen={handleModalOpen} />} />
          <Route path="*" element={<Navigate to="/overview" replace />} />
        </Route>
      </Routes>

      { isModalOpened && <Modal modal={modal} handleModalClose={handleModalClose} />}
    </>

  )
}
