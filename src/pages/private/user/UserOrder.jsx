import { Swiper, SwiperSlide } from "swiper/react";
import { CiLocationOn } from "react-icons/ci";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import DialogReceipt from "@/Components/CustomSection/DialogReceipt";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const UserOrder = () => {
  const [receipt, setReceipt] = useState(false);

  const barsdata = [
    {
      id: 1,
      name: "Bar 1",
      address: " Moronchand Misthanno Vandar",
      image: "https://alex420.netlify.app/assets/barman-Cm24ZJHF.png",
      distance: 1.2,
      storename: "Green Store Ltd.",
      description:
        "Mauris et tortor sit amet ex sagittis feugiat praesent rutrum, lorem ipsum dolor sit amet.",
      opentime: "Open:4.30PM-10PM",
      ratings: "4.5",
    },
    {
      id: 2,
      name: "Bar 2",
      address: " Moronchand Misthanno Vandar",
      image: "https://alex420.netlify.app/assets/barman-Cm24ZJHF.png",
      distance: 3.4,
      storename: "Green Store Ltd.",
      description:
        "Mauris et tortor sit amet ex sagittis feugiat praesent rutrum, lorem ipsum dolor sit amet.",
      opentime: "Open:4.30PM-10PM",
      ratings: "4.5",
    },
    {
      id: 3,
      name: "Bar 3",
      address: " Moronchand Misthanno Vandar",
      image: "https://alex420.netlify.app/assets/barman-Cm24ZJHF.png",
      distance: 2.1,
      storename: "Green Store Ltd.",
      description:
        "Mauris et tortor sit amet ex sagittis feugiat praesent rutrum, lorem ipsum dolor sit amet.",
      opentime: "Open:4.30PM-10PM",
      ratings: "4.5",
    },
    {
      id: 4,
      name: "Bar 3",
      address: " Moronchand Misthanno Vandar",
      image: "https://alex420.netlify.app/assets/barman-Cm24ZJHF.png",
      distance: 2.1,
      storename: "Green Store Ltd.",
      description:
        "Mauris et tortor sit amet ex sagittis feugiat praesent rutrum, lorem ipsum dolor sit amet.",
      opentime: "Open:4.30PM-10PM",
      ratings: "4.5",
    },
    {
      id: 5,
      name: "Bar 3",
      address: " Moronchand Misthanno Vandar",
      image: "https://alex420.netlify.app/assets/barman-Cm24ZJHF.png",
      distance: 2.1,
      storename: "Green Store Ltd.",
      description:
        "Mauris et tortor sit amet ex sagittis feugiat praesent rutrum, lorem ipsum dolor sit amet.",
      opentime: "Open:4.30PM-10PM",
      ratings: "4.5",
    },
    {
      id: 6,
      name: "Bar 3",
      address: " Moronchand Misthanno Vandar",
      image: "https://alex420.netlify.app/assets/barman-Cm24ZJHF.png",
      distance: 2.1,
      storename: "Green Store Ltd.",
      description:
        "Mauris et tortor sit amet ex sagittis feugiat praesent rutrum, lorem ipsum dolor sit amet.",
      opentime: "Open:4.30PM-10PM",
      ratings: "4.5",
    },
    {
      id: 7,
      name: "Bar 3",
      address: " Moronchand Misthanno Vandar",
      image: "https://alex420.netlify.app/assets/barman-Cm24ZJHF.png",
      distance: 2.1,
      storename: "Green Store Ltd.",
      description:
        "Mauris et tortor sit amet ex sagittis feugiat praesent rutrum, lorem ipsum dolor sit amet.",
      opentime: "Open:4.30PM-10PM",
      ratings: "4.5",
    },
    {
      id: 8,
      name: "Bar 3",
      address: " Moronchand Misthanno Vandar",
      image: "https://alex420.netlify.app/assets/barman-Cm24ZJHF.png",
      distance: 2.1,
      storename: "Green Store Ltd.",
      description:
        "Mauris et tortor sit amet ex sagittis feugiat praesent rutrum, lorem ipsum dolor sit amet.",
      opentime: "Open:4.30PM-10PM",
      ratings: "4.5",
    },
    {
      id: 9,
      name: "Bar 3",
      address: " Moronchand Misthanno Vandar",
      image: "https://alex420.netlify.app/assets/barman-Cm24ZJHF.png",
      distance: 2.1,
      storename: "Green Store Ltd.",
      description:
        "Mauris et tortor sit amet ex sagittis feugiat praesent rutrum, lorem ipsum dolor sit amet.",
      opentime: "Open:4.30PM-10PM",
      ratings: "4.5",
    },
    {
      id: 10,
      name: "Bar 3",
      address: " Moronchand Misthanno Vandar",
      image: "https://alex420.netlify.app/assets/barman-Cm24ZJHF.png",
      distance: 2.1,
      storename: "Green Store Ltd.",
      description:
        "Mauris et tortor sit amet ex sagittis feugiat praesent rutrum, lorem ipsum dolor sit amet.",
      opentime: "Open:4.30PM-10PM",
      ratings: "4.5",
    },
    {
      id: 11,
      name: "Bar 3",
      address: " Moronchand Misthanno Vandar",
      image: "https://alex420.netlify.app/assets/barman-Cm24ZJHF.png",
      distance: 2.1,
      storename: "Green Store Ltd.",
      description:
        "Mauris et tortor sit amet ex sagittis feugiat praesent rutrum, lorem ipsum dolor sit amet.",
      opentime: "Open:4.30PM-10PM",
      ratings: "4.5",
    },
    {
      id: 12,
      name: "Bar 3",
      address: " Moronchand Misthanno Vandar",
      image: "https://alex420.netlify.app/assets/barman-Cm24ZJHF.png",
      distance: 2.1,
      storename: "Green Store Ltd.",
      description:
        "Mauris et tortor sit amet ex sagittis feugiat praesent rutrum, lorem ipsum dolor sit amet.",
      opentime: "Open:4.30PM-10PM",
      ratings: "4.5",
    },
  ];

  return (
    <section className="py-12 lg:pb-0">
      <section className="px-4 sm:px-6 md:px-10 overflow-hidden pb-2.5 border-b">
        <h2 className="text-xl font-semibold mb-7">Order history</h2>
        <Swiper
          slidesPerView={"auto"}
          centeredSlides={false}
          spaceBetween={20}
          pagination={{
            clickable: true,
            renderBullet: function (index, className) {
              return `<span class="${className} custom-bullet"></span>`;
            },
          }}
          modules={[Pagination]}
          className="!overflow-visible"
        >
          {Array(12)
            .fill(null)
            .map((_, idx) => (
              <SwiperSlide key={idx} className="!w-fit mb-12">
                <div className="bg-[#fafafa] flex gap-2.5 text-[#181818] p-[18px] rounded-[6px] min-w-[300px] sm:w-[350px] md:w-[420px] border border-[#C8C8C8]">
                  <div className="left shrink-0">
                    <figure className="w-[135px] h-full rounded-[6px] border border-[#C8C8C8] flex justify-center items-center">
                      <img
                        src="https://i.ibb.co.com/84S5d37z/bottole.png"
                        alt=""
                      />
                    </figure>
                  </div>
                  <div className="right text-sm grow space-y-[14px]">
                    <div>
                      <h3 className="text-xl tracking-[0.6px] font-instrument mb-1 line-clamp-1">
                        Mouton Cadet Bordeaux Rouge
                      </h3>
                      <h3 className="text-xl font-semibold">$100.99</h3>
                    </div>
                    <p className="line-clamp-3 tracking-[0.42px] text-sm text-[#4E4E4E]">
                      It was popularised in the 1960s with the release of
                      Letraset sheets containing
                    </p>
                    <div className="flex justify-between">
                      <p>Time : 8.00 PM</p>
                      <p>Date : 12/12/2024</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>

      <section className="px-4 sm:px-6 md:px-10 overflow-hidden pb-9 border-b">
        <h2 className="text-xl font-semibold mb-7 mt-10">Nearby Bars</h2>
        <Swiper
          slidesPerView={"auto"}
          centeredSlides={false}
          spaceBetween={20}
          pagination={{
            clickable: true,
            renderBullet: function (index, className) {
              return `<span class="${className} custom-bullet"></span>`;
            },
          }}
          modules={[Pagination]}
          className="!overflow-visible"
        >
          {barsdata.map((item, index) => (
            <SwiperSlide key={index} className="!w-fit mb-12">
              <Link to="/bar-drinks">
                <div className="min-w-[280px] sm:w-[340px] md:w-[393px] group rounded-[4px] border-2 border-[#DBA514] flex flex-col group cursor-pointer">
                  <img src={item.image} alt={item.name} className="w-full" />
                  <div className="px-3 pt-3 pb-[19px] group-hover:bg-black duration-300 ease-in-out cursor-pointer rounded-b-[4px]">
                    <div className="flex gap-x-1">
                      <CiLocationOn className="fill-black h-5 w-5 group-hover:fill-white" />
                      <h3 className="text-[14px] group-hover:text-[#FFF] text-black font-normal">
                        {item.address}
                      </h3>
                    </div>
                    <h2 className="text-[24px] group-hover:text-[#FFF] text-black font-normal pt-2 pb-1 font-instrument">
                      {item.storename}
                    </h2>
                    <p className="group-hover:text-[#FFF] text-black text-[16px] font-normal">
                      {item.description}
                    </p>
                    <div className="flex justify-between pt-[14px]">
                      <h4 className="text-[16px] group-hover:text-[#FFF] text-black font-normal font-instrument flex gap-x-1 items-center">
                        {item.ratings}
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                      </h4>
                      <p className="text-[16px] group-hover:text-[#FFF] text-black font-normal">
                        {item.opentime}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <DialogReceipt receipt={receipt} setReceipt={setReceipt} />
    </section>
  );
};

export default UserOrder;
