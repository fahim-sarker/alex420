/* eslint-disable react/no-unknown-property */

/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import Container from "../../Shared/Container";
import { format } from "date-fns";
import Checkout from "../Popup/Checkout";
import useFetchData from "../Hooks/Api/UseFetchData";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setOrderDetails } from "../Slice/Productslice";
import useAxios from "../Hooks/Api/UseAxios";
import Modal from "../CustomSection/Modal";

const Drinks = ({ receipt, setReceipt, barId }) => {
  const [selectedDrinkId, setSelectedDrinkId] = useState(null);
  const [selectedDrinkDetails, setSelectedDrinkDetails] = useState(null);
  const [popUp2, setPopUp2] = useState(false);
  const [input2, setInput2] = useState(1);
  const Axiosinstance = useAxios();

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

  const {
    data: products,
    error,
    isLoading,
  } = useFetchData(`/api/bar/${barId?.barId}/products`);
  // console.log(products);

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <section className="bg-[#FFF] py-[100px]">
      <Container>
        <h3 className="text-[42px]  sm:text-[48px] font-normal font-instrument text-[#000] text-center pb-10">
          Discover Our Drinks
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative">
          {products?.data?.map((item, index) => (
            <div
              key={index}
              className="pt-[37px] px-[20px] pb-[20px] border-[0.5px] border-[#DBA514]/30 rounded-[6px] relative cursor-pointer group mx-3"
            >
              <div className="xs:pb-[15px] sm:pb-[50px] flex justify-center group-hover:scale-115 duration-300 ease-in-out">
                <img
                  src={
                    item?.image
                      ? `${import.meta.env.VITE_BASE_URL}/${item.image}`
                      : "/fallback.jpg"
                  }
                  alt={item.title}
                  className="h-[120px] sm:h-[200px] w-fit"
                />
              </div>
              <h3 className="text-[16px] text-[#6B6B6B] font-medium capitalize">
                {item.category}
              </h3>
              <h4 className="text-[16px] text-[#0E0E0E] font-normal py-[6px] leading-none">
                {item.description}
              </h4>
              <h5 className="text-[24px] text-[#0E0E0E] font-semibold py-[6px]">
                {item.selling_price}
              </h5>
              <div className="pb-3 flex gap-x-[10px]">
                {renderStars(item.review)}
                <p className="text-[16px] font-medium text-[#6B6B6B] ">
                  {item.review}
                </p>
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
      </Container>

      {selectedDrinkDetails && (
        <Modal
          selectedDrinkDetails={selectedDrinkDetails}
          input2={input2}
          setInput2={setInput2}
          formData={formData}
          updateFormData={updateFormData}
          errors={errors}
          onClose={() => {
            setSelectedDrinkId(null);
            setSelectedDrinkDetails(null);
          }}
          handleOrderNow={handleBtn}
        />
      )}

      {popUp2 && (
        <Checkout
          setPopUp2={setPopUp2}
          receipt={receipt}
          setReceipt={setReceipt}
        />
      )}
    </section>
  );
};

export default Drinks;
