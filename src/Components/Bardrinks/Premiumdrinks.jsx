import { useEffect, useState } from "react";
import Container from "../../Shared/Container";
import { Label } from "../ui/label";
import { Popover } from "../ui/popover";
import { Button } from "../ui/button";
import { CalenderIcon } from "@/assets/icons/icons";
import { ClockIcon } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import Checkout from "../Popup/Checkout";
import useFetchData from "../Hooks/Api/UseFetchData";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setOrderDetails } from "../Slice/Productslice";
import useAxios from "../Hooks/Api/UseAxios";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";

const Premiumdrinks = ({ receipt, setReceipt, barId }) => {
  const [selectedDrinkId, setSelectedDrinkId] = useState(null);
  const [selectedDrinkDetails, setSelectedDrinkDetails] = useState(null);
  const [popUp2, setPopUp2] = useState(false);
  const [input2, setInput2] = useState(1);
  const Axiosinstance = useAxios();
  const userToken = JSON.parse(localStorage.getItem("usertoken"));
  const token = userToken?.token;

  const [formData, setFormData] = useState({
    date: undefined,
    hours: "",
    minutes: "",
    ampm: "AM",
  });

  const updateFormData = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const { data: products, isLoading } = useFetchData(
    `/api/bar/${barId?.barId}/premium/products`,
    token
  );
  console.log("drinks", products);

  useEffect(() => {
    if (selectedDrinkId && barId?.barId) {
      const fetchDetails = async () => {
        try {
          const res = await Axiosinstance.get(
            `/api/bar/${barId?.barId}/products`
          );
          const allProducts = res.data?.data;
          const selectedProduct = allProducts.find(
            (product) => product.id === Number(selectedDrinkId)
          );

          setSelectedDrinkDetails(selectedProduct || null);
        } catch (err) {
          console.error("Error fetching product details", err);
        }
      };

      fetchDetails();
    }
  }, [selectedDrinkId, barId]);

  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    date: "",
    time: "",
  });

  const handleBtn = () => {
    let hasError = false;
    const newErrors = { date: "", time: "" };

    if (!formData.date) {
      newErrors.date = "Date is required";
      hasError = true;
    }
    if (!formData.hours || !formData.minutes) {
      newErrors.time = "Time is required";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError || !selectedDrinkDetails) return;

    const totalPrice =
      input2 > 1
        ? (
            parseFloat(input2) * parseFloat(selectedDrinkDetails.selling_price)
          ).toFixed(2)
        : selectedDrinkDetails.selling_price;

    const formattedDate = format(formData.date, "yyyy-MM-dd");
    const hours24 =
      formData.ampm === "PM"
        ? String((parseInt(formData.hours) % 12) + 12).padStart(2, "0")
        : String(parseInt(formData.hours) % 12).padStart(2, "0");
    const formattedTime = `${hours24}:${formData.minutes.padStart(2, "0")}:00`;

    const orderData = {
      ...selectedDrinkDetails,
      quantity: input2,
      totalPrice,
      shots_date: formattedDate,
      shots_time: formattedTime,
    };

    if (orderData) {
      console.log("before set in payload", orderData);
      dispatch(setOrderDetails(orderData));
    }
    setPopUp2(true);
    setInput2(1);
  };

  const renderStars = (review) => {
    const fullStars = Math.floor(review);
    const hasHalfStar = review % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex gap-x-1">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-500" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-yellow-500" />
        ))}
      </div>
    );
  };

  const itemsPerPage = 12;
  const items = products?.data || [];
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <section className="bg-[#000] py-[100px]">
        <Container>
          <h3 className="text-[48px] font-normal font-instrument text-[#fff] text-center pb-2">
            Premium Drinks
          </h3>
          <motion.div
            className="bg-[#EEB608] h-[2px] mx-auto mt-2 mb-20"
            initial={{ width: 0 }}
            animate={{ width: "257px" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          {isLoading ? (
            <div className="flex flex-wrap gap-4 justify-between w-full">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-200 rounded-md w-[380px]  h-[260px]"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 relative bg-black">
              {currentItems?.map((item, index) => (
                <div
                  key={index}
                  className="p-[20px] border-[0.5px] border-[#DBA514]/30 rounded-[6px] relative cursor-pointer group flex flex-col"
                >
                  <figure className="mb-[50px] h-[200px] w-full overflow-hidden">
                    <img
                      src={
                        item?.image
                          ? `${import.meta.env.VITE_BASE_URL}/${item.image}`
                          : "/fallback.jpg"
                      }
                      alt={item.title}
                      className="h-full object-center object-cover mx-auto duration-300 transition-all"
                    />
                  </figure>
                  <h3 className="text-[16px] text-[#6B6B6B] font-medium capitalize">
                    {item.category}
                  </h3>
                  <h4 className="text-[16px] text-[#fff] font-normal py-[6px] leading-none grow">
                    {item.description}
                  </h4>
                  <h5 className="text-[24px] text-[#fff] font-semibold py-[6px]">
                    ${item.selling_price}
                  </h5>
                  <div className="pb-3 flex gap-x-[10px]">
                    {renderStars(item.review)}
                    {/* <p className="text-[16px] font-medium text-[#6B6B6B] ">
                    {item.review}
                  </p> */}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedDrinkId(item.id);
                      setSelectedDrinkDetails(item);
                    }}
                    className="flex justify-center items-center leading-none py-[16px] px-[32px] capitalize font-semibold text-[18px] rounded-lg bg-[linear-gradient(92deg,_#DBA514_2.3%,_#EEB609_35.25%,_#C69320_66.76%,_#FCC201_97.79%)] backdrop-blur-[6.5px] text-[#0E0E0E] cursor-pointer tracking-[0.72px] w-full"
                  >
                    Buy now
                  </button>
                </div>
              ))}
            </div>
          )}

          {items.length > itemsPerPage && (
            <div className="mt-8 flex justify-center">
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< Prev"
                containerClassName="flex items-center gap-2"
                pageClassName="px-3 py-1 border rounded cursor-pointer"
                activeClassName="bg-black text-white"
                previousClassName="px-3 py-1 border rounded cursor-pointer"
                nextClassName="px-3 py-1 border rounded cursor-pointer"
                breakClassName="px-3 py-1"
              />
            </div>
          )}
        </Container>

        {selectedDrinkDetails && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={() => {
              setSelectedDrinkId(null);
              setSelectedDrinkDetails(null);
            }}
          >
            <div
              className="bg-white pt-[30px] pb-[40px] pl-[58px] pr-[91px] rounded-lg relative  z-50 h-[850px] w-[700px]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-2xl font-bold cursor-pointer"
                onClick={() => {
                  setSelectedDrinkId(null);
                  setSelectedDrinkDetails(null);
                }}
              >
                ×
              </button>
              <div className="flex gap-x-8">
                <div className="px-[38px] py-[15px] border border-[#DBA514] rounded-[6px]">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/${
                      selectedDrinkDetails.image
                    }`}
                    alt={selectedDrinkDetails.name}
                  />
                </div>
                <div>
                  <p className="text-[24px] font-instrument text-[#0E0E0E]">
                    {selectedDrinkDetails.description}
                  </p>
                  <h3 className="text-[16px] text-[#000] py-2">
                    Brand: {selectedDrinkDetails.name}
                  </h3>
                  <div className="flex gap-x-2">
                    {renderStars(selectedDrinkDetails.review)}
                    <p className="text-[#6B6B6B] font-medium">
                      {selectedDrinkDetails.review}
                    </p>
                  </div>
                  <div className="flex gap-x-3 py-[6px]">
                    <input
                      type="number"
                      value={input2}
                      onChange={(e) => setInput2(e.target.value)}
                      className="px-2 py-2 border rounded-[4px] outline-none text-[#000] w-[75px]"
                    />
                    <select className="px-2 py-2 border rounded-[4px] text-[#000] w-[135px]">
                      <option>Bottles</option>
                      <option>Glass</option>
                    </select>
                  </div>
                  <p className="text-[24px] font-semibold text-[#000]">
                    {input2 > 1
                      ? `$${(
                          input2 * selectedDrinkDetails.selling_price
                        ).toFixed(2)}`
                      : `$${selectedDrinkDetails.selling_price}`}
                  </p>
                </div>
              </div>
              <div className="pl-[30px]">
                <h3 className="text-[#0E0E0E] text-[24px] font-normal font-instrument pt-[20px]">
                  Shots Time
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <Label
                      htmlFor="hours"
                      className="block font-normal text-[18px] text-[#000]"
                    >
                      {errors.time && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.time}
                        </p>
                      )}

                      <span className="flex justify-between px-[11px] py-[12px] border-[0.5px] mb-[7px] text-[18px] border-[#6B6B6B] rounded-[4px] items-center">
                        Time
                        <ClockIcon className="size-6 text-[#4E4E4E] opacity-90" />
                      </span>
                      <div className="flex gap-x-1 items-center h-[35px] bg-white rounded-md border border-input w-[225px]">
                        <input
                          type="number"
                          placeholder="00"
                          value={formData.hours}
                          onChange={(e) =>
                            updateFormData("hours", e.target.value)
                          }
                          className="bg-[#F8F8FF] text-black w-[75px] text-center outline-none h-full"
                        />
                        <input
                          type="number"
                          placeholder="00"
                          value={formData.minutes}
                          onChange={(e) =>
                            updateFormData("minutes", e.target.value)
                          }
                          className="bg-[#F8F8FF] text-black w-[75px] text-center outline-none h-full"
                        />
                        <select
                          value={formData.ampm}
                          onChange={(e) =>
                            updateFormData("ampm", e.target.value)
                          }
                          className="bg-[#F8F8FF] text-black w-[75px] text-center outline-none text-[14px] appearance-none h-full"
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                    </Label>
                  </div>

                  <div>
                    <Popover>
                      <div>
                        <Button
                          variant="outline"
                          className="w-full justify-between text-left h-[56px] font-normal text-[18px] text-[#000]"
                          id="date"
                          type="button"
                        >
                          {formData.date
                            ? format(formData.date, "PPP")
                            : " Date"}
                          <CalenderIcon className="size-6" />
                        </Button>
                      </div>
                      <div className="w-auto p-0">
                        <CalendarComponent
                          className="border border-black/5 rounded-[4px] p-3 mt-2 w-fit"
                          mode="single"
                          selected={formData.date}
                          onSelect={(date) => updateFormData("date", date)}
                          initialFocus
                        />
                      </div>
                      {errors.date && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.date}
                        </p>
                      )}
                    </Popover>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-[50px]">
                <button
                  onClick={handleBtn}
                  className="py-[18px] px-[90px] text-[18px] cursor-pointer rounded-lg bg-[linear-gradient(92deg,_#DBA514_2.3%,_#EEB609_35.25%,_#C69320_66.76%,_#FCC201_97.79%)] text-[#0E0E0E] font-semibold"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        )}

        {popUp2 && (
          <Checkout
            setPopUp2={setPopUp2}
            receipt={receipt}
            setReceipt={setReceipt}
          />
        )}
      </section>
    </>
  );
};

export default Premiumdrinks;
