import ProductSellCard from "@/Components/CustomComponents/ProductSellCard";
import SalesChart from "@/Components/CustomComponents/SalesChart";
import { useState } from "react";
import useFetchData from "../Hooks/Api/UseFetchData";

const UnderSelling = () => {
  const [graph1, setGraph1] = useState(false);
  const tokenData = JSON.parse(localStorage.getItem("usertoken"));
  const token = tokenData?.token;

  const { data: most_selling } = useFetchData(
    "/api/dashboard/bar/products/most-selling",
    token
  );

  return (
    <>
      <h2 className="text-xl font-semibold mt-10 mb-6">Under selling</h2>
      <section className="space-y-9">
        <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-[22px]">
          <ProductSellCard
            onSelect={(index) => setGraph1(graph1 === index ? false : index)}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[linear-gradient(92deg,#DBA514_2.3%,#EEB609_35.25%,#FCC201_97.79%)] text-lg font-medium text-black px-6 py-4 leading-none rounded-md hover:shadow-xl cursor-pointer w-[204px]"
          >
            View all
          </button>
        </div>
        {graph1 !== false && (
          <section className="bg-[#F8F8FF] border border-[#DBA514] rounded-md overflow-hidden py-8 px-12">
            <h3 className="text-2xl font-bold font-poppins mb-8 capitalize">
              {most_selling?.data?.[graph1]?.name}
            </h3>
            <SalesChart className="bg-transparent" />
          </section>
        )}
      </section>
    </>
  );
};

export default UnderSelling;
