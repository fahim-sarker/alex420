import { useState } from "react";
import Container from "../../Shared/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Label } from "../ui/label";
import { Popover } from "../ui/popover";
import { Button } from "../ui/button";
import { CalenderIcon } from "@/assets/icons/icons";
import { ClockIcon } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

const FeaturedDrinks = () => {
  const [selectedDrink, setSelectedDrink] = useState(null);

  const [formData, setFormData] = useState({
    productName: "",
    productId: "",
    date: undefined,
    hours: "",
    minutes: "",
    ampm: "AM",
    assignedBy: "",
    category: "",
    shelfNumber: "",
    price: "",
    sellingPrice: "",
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const drinksinfo = [
    {
      id: 1,
      title: "Vermouth",
      image: "https://i.ibb.co.com/Rr6b2PW/bottle.png",
      description: "Mouton Cadet Bordeaux Rouge 2020 ",
      price: "$ 10.11–$ 19.99",
      ratings: "5 reviews",
      tags: ["Best Seller", "In stock"],
    },
    {
      id: 2,
      title: "Vermouth",
      image: "https://i.ibb.co.com/Rr6b2PW/bottle.png",
      description: "Mouton Cadet Bordeaux Rouge 2020 ",
      price: "$ 10.11–$ 19.99",
      ratings: "5 reviews",
      tags: ["Best Seller", "In stock"],
    },
    {
      id: 3,
      title: "Vermouth",
      image: "https://i.ibb.co.com/Rr6b2PW/bottle.png",
      description: "Mouton Cadet Bordeaux Rouge 2020 ",
      price: "$ 10.11–$ 19.99",
      ratings: "5 reviews",
      tags: ["Best Seller", "In stock"],
    },
    {
      id: 4,
      title: "Vermouth",
      image: "https://i.ibb.co.com/Rr6b2PW/bottle.png",
      description: "Mouton Cadet Bordeaux Rouge 2020 ",
      price: "$ 10.11–$ 19.99",
      ratings: "5 reviews",
      tags: ["Best Seller", "In stock"],
    },
    {
      id: 5,
      title: "Vermouth",
      image: "https://i.ibb.co.com/Rr6b2PW/bottle.png",
      description: "Mouton Cadet Bordeaux Rouge 2020 ",
      price: "$ 10.11–$ 19.99",
      ratings: "5 reviews",
      tags: ["Best Seller", "In stock"],
    },
    {
      id: 6,
      title: "Vermouth",
      image: "https://i.ibb.co.com/Rr6b2PW/bottle.png",
      description: "Mouton Cadet Bordeaux Rouge 2020 ",
      price: "$ 10.11–$ 19.99",
      ratings: "5 reviews",
      tags: ["Best Seller", "In stock"],
    },
  ];
  const handleDrinkClick = () => {
    console.log("hello");
  };

  return (
    <section className="bg-[#FFF] pb-[100px]">
      <Container>
        <h3 className="text-[42px]  sm:text-[48px] font-normal font-instrument text-[#000] text-center pb-10">
          Featured Drinks
        </h3>
      </Container>
      <Swiper
        slidesPerView={"auto"}
        initialSlide={2}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className} custom-bullet"></span>`;
          },
        }}
        modules={[Pagination]}
        className="newslatter !overflow-hidden"
      >
        {drinksinfo?.map((item, index) => (
          <SwiperSlide
            key={index}
            onClick={() => handleDrinkClick(item)}
            className="w-fit"
          >
            <div className="pt-[37px] px-[20px] pb-[20px] border-[0.5px] border-[#DBA514]/30 rounded-[6px] relative cursor-pointer group xs:w-[300px] sm:w-[350px]">
              <div className="xs:pb-[15px] sm:pb-[50px] flex justify-center group-hover:scale-115 duration-300 ease-in-out">
                <img
                  className="h-[120px] sm:h-[200px] w-fit"
                  src={item.image}
                  alt="image"
                />
              </div>
              <h3 className="text-[16px] text-[#6B6B6B] font-medium">
                {item.title}
              </h3>
              <h4 className="text-[20px] text-[#0E0E0E] font-normal font-instrument py-[6px] leading-none">
                {item.description}
              </h4>
              <h5 className="text-[24px] text-[#0E0E0E] font-semibold py-[6px]">
                {item.price}
              </h5>
              <div className="pb-3 flex gap-x-[10px]">
                <div className="flex gap-x-1">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>
                <p className="text-[16px] font-medium text-[#6B6B6B] ">
                  {item.ratings}
                </p>
              </div>
              <button
                onClick={() => handleDrinkClick(item)}
                className="flex justify-center items-center leading-none py-[16px] px-[32px] capitalize font-semibold text-[18px] rounded-lg bg-[linear-gradient(92deg,_#DBA514_2.3%,_#EEB609_35.25%,_#C69320_66.76%,_#FCC201_97.79%)] backdrop-blur-[6.5px] text-[#0E0E0E] cursor-pointer tracking-[0.72px] w-full"
              >
                Buy now
              </button>
              <div className="absolute top-[14px] left-[21px]">
                {[1, 2, 3].includes(index) && item.tags.length > 0 && (
                  <span className="text-[#0E0E0E] text-[16px] bg-[linear-gradient(92deg,_#DBA514_2.3%,_#EEB609_35.25%,_#C69320_66.76%,_#FCC201_97.79%)] backdrop-blur-[6.5px] px-[10px] py-[7px] rounded-[6px]">
                    {index === 3 && item.tags.length > 1
                      ? item.tags[1]
                      : item.tags[0]}
                  </span>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {selectedDrink && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setSelectedDrink(null)}
        >
          <div
            className="bg-white pt-[35px] pb-[100px] pl-[58px] pr-[91px] rounded-lg relative w-[651px] z-50 h-[900px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="float-right absolute top-4 right-4 cursor-pointer font-bold text-2xl"
              onClick={() => setSelectedDrink(null)}
            >
              ×
            </button>
            <div className="flex gap-x-8">
              <div className="px-[38px] py-[15px] border border-[#DBA514] rounded-[6px]">
                <img src={selectedDrink.image} alt={selectedDrink.title} />
              </div>
              <div>
                <p className="text-[24px] font-instrument font-normal text-[#0E0E0E]">
                  {selectedDrink.description}
                </p>
                <h3 className="text-[16px] text-[#000] font-normal py-2">
                  Brands : {selectedDrink.title}
                </h3>
                <div className="flex gap-x-[10px]">
                  <div className="flex gap-x-1">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </div>
                  <p className="text-[16px] font-medium text-[#6B6B6B] ">
                    {selectedDrink?.ratings}
                  </p>
                </div>
                <div className="flex gap-x-[10px] py-[6px]">
                  <input
                    type="number"
                    placeholder="01"
                    className="px-2 py-2 border border-[#C8C8C8] bg-[#F8F8FF] rounded-[4px] outline-none text-[#000] w-[75px] cursor-pointer"
                  />
                  <div className="relative">
                    <select className="px-2 py-2 border border-[#C8C8C8] bg-[#F8F8FF] rounded-[4px] outline-none text-[#000] w-[135px] appearance-none cursor-pointer">
                      <option>Bottles</option>
                      <option>glass</option>
                    </select>
                    <svg
                      className="absolute right-2 top-1/2 -translate-y-1/2 transform w-4 h-4 pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-[24px] text-[#000] font-semibold">
                  {selectedDrink.price}
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
                    <span className="flex justify-between px-[11px] py-[12px] border-[0.5px] mb-[7px] text-[18px] border-[#6B6B6B] rounded-[4px] items-center">
                      Time{" "}
                      <ClockIcon className="size-6 text-[#4E4E4E] opacity-90" />
                    </span>
                    <div className="flex gap-x-1 items-center h-[35px] bg-white rounded-md border border-input w-[225px]">
                      <input
                        type="number"
                        placeholder="00"
                        className="bg-[#F8F8FF] text-black w-[75px] text-center outline-none h-full"
                      />
                      <input
                        type="number"
                        placeholder="00"
                        className="bg-[#F8F8FF] text-black w-[75px] text-center outline-none h-full"
                      />
                      <select className="bg-[#F8F8FF] text-black w-[75px] text-center outline-none text-[14px] appearance-none h-full">
                        <option>AM</option>
                        <option>PM</option>
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
                        {formData.date ? format(formData.date, "PPP") : " Date"}
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
                  </Popover>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="flex justify-center items-center leading-none py-[18px] px-[90px] mt-[50px] capitalize font-semibold text-[18px] rounded-lg bg-[linear-gradient(92deg,_#DBA514_2.3%,_#EEB609_35.25%,_#C69320_66.76%,_#FCC201_97.79%)] backdrop-blur-[6.5px] text-[#0E0E0E] cursor-pointer tracking-[0.72px]">
                Order Now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedDrinks;

const Star = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M13.0478 14.9558C12.5146 15.3356 9.09371 12.9284 8.43853 12.9231C7.78335 12.9178 4.32395 15.2697 3.79702 14.8814C3.2701 14.4931 4.50887 10.505 4.31146 9.88208C4.11404 9.25914 0.801874 6.70512 1.00935 6.08541C1.21687 5.46571 5.40337 5.40815 5.93651 5.0284C6.46966 4.6487 7.88206 0.718393 8.53729 0.723638C9.19242 0.728929 10.541 4.68145 11.0679 5.06972C11.5949 5.45796 15.7799 5.58293 15.9774 6.20587C16.1748 6.82881 12.8218 9.3292 12.6143 9.9489C12.4068 10.5686 13.5809 14.5761 13.0478 14.9558Z"
      fill="#F8B84E"
    />
  </svg>
);
