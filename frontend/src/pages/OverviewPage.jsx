import { useEffect, useState } from "react";
import { MdOutlineStore } from "react-icons/md";
import { RiGiftLine } from "react-icons/ri";
import { RiQuestionAnswerLine } from "react-icons/ri";
import useApi from "../api/useApi";

export default function OverviewPage() {
  const api = useApi();
  const [totals, setTotals] = useState({products: 0, stores: 0, faqs: 0});

  useEffect(() => {
    async function fetchAll() {
      try {
        const [products, stores, faqs] = await Promise.all([
          api.fetchData("products"),
          api.fetchData("shops"),
          api.fetchData("questions")
        ]);

        setTotals({products: products.length, stores: stores.length, faqs: faqs.length});
      } catch(err) {
        console.log(err);
      }
    }
    
    fetchAll();
  }, []);

  return (
    <div className="bg-slate-200 h-dvh">
      <h3 className="text-2xl text-primary font-bold text-left py-4 px-6 shadow-2xs bg-white">Overview</h3>
      <div className="flex py-8 px-6 gap-6 flex-wrap justify-center sm:justify-start">
        <div className="flex justify-center items-center bg-white rounded-xl shadow-lg p-4 gap-3">
          <div className="bg-blue-200 p-2 rounded-xl">
            <RiGiftLine color="2563EB" size={40} />
          </div>
          <div className="flex flex-col w-15">
            <span className="text-3xl font-bold text-blue-600">{totals.products}</span>
            <span className="text-xs">Products</span>
          </div>
        </div>

        <div className="flex justify-center items-center bg-white rounded-xl shadow-lg p-4 gap-3">
          <div className="bg-purple-200 p-2 rounded-xl">
            <MdOutlineStore color="805ad5" size={40} />
          </div>
          <div className="flex flex-col w-15">
            <span className="text-3xl font-bold text-purple-600">{totals.stores}</span>
            <span className="text-xs">Stores</span>
          </div>
        </div>

        <div className="flex justify-center items-center bg-white rounded-xl shadow-lg p-4 gap-3">
          <div className="bg-green-200 p-2 rounded-xl">
            <RiQuestionAnswerLine color="38a169" size={40} />
          </div>
          <div className="flex flex-col w-15">
            <span className="text-3xl font-bold text-green-600">{totals.faqs}</span>
            <span className="text-xs">FAQs</span>
          </div>
        </div>
      </div>
    </div>
  )
}