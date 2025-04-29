// import { GrowthIcon } from "@/assets/icons/icons";
import { cn } from "@/lib/utils";
import useFetchData from "../Hooks/Api/UseFetchData";
import { useParams } from "react-router-dom";
import useAxios from "../Hooks/Api/UseAxios";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../Context/ChartInfoContext";

const ProductSellCard = ({ className, onSelect, ...props }) => {
  const axiosinstance = useAxios();
  const sellierid = useParams();
  console.log(sellierid);

  const { setChartInfo } = useContext(MainContext);

  const tokenData = JSON.parse(localStorage.getItem("usertoken"));
  const token = tokenData?.token;
  const { selectdate } = useContext(MainContext);
  console.log(selectdate);

  const { data: most_selling } = useFetchData(
    "/api/dashboard/bar/products/most-selling",
    token
  );
  const [selectedid, setSelectedid] = useState(null);

  useEffect(() => {
    const handleChartInfo = async (id) => {
      if (!selectdate || !id) {
        console.error("Date or ID is not provided");
        return;
      }
  
      const tokenData = JSON.parse(localStorage.getItem("usertoken"));
      const token = tokenData?.token;
      if (!token) {
        console.error("Token not found");
        return;
      }
  
      try {
        const response = await axiosinstance.get(
          `/api/dashboard/bar/products/sales-statistics-chart?date=${selectdate}&product_id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const customizedData = response.data.data.map((item) => ({
          date: item.date.split("-")[2],
          sales: item.sales,
        }));
        setChartInfo(customizedData);
      } catch (error) {
        console.error("Error fetching chartinfo data:", error);
      }
    };
  
    handleChartInfo(selectedid);
  }, [selectdate, selectedid]);
  

  return (
    <>
      {most_selling?.data?.map((mostselling, index) => (
        <div
          key={index}
          className={cn(
            "p-[18px] rounded-[6px] border border-[#DBA514] bg-[#FAFAFA] grid grid-cols-3 gap-3 cursor-pointer items-center",
            className
          )}
          {...props}
          onClick={() => {
            onSelect(index);
            setSelectedid(mostselling?.id);
          }}
        >
          <div className="left p-3 border border-[#C8C8C8] rounded-[6px]">
            <figure className="w-full h-full overflow-hidden">
              <img
                src={
                  mostselling?.image
                    ? `${import.meta.env.VITE_BASE_URL}/${mostselling.image}`
                    : "/fallback.jpg"
                }
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </figure>
          </div>
          <div className="right col-span-2">
            <h4 className="text-[22px] tracking-[0.668px] font-instrument mb-1 capitalize">
              {mostselling?.name}
            </h4>
            <p>Id: #{mostselling.product_id}</p>
            {/* <p className="text-[#606060] font-medium inline-flex gap-1 items-center mb-[22px]">
          <GrowthIcon />
          <span className="text-[#00B69B] ">8.5% </span> Up from yesterday
        </p> */}
            <p className="text-2xl font-semibold tracking-[0.668px]">
              ${mostselling?.selling_price}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductSellCard;
