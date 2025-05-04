import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import Container from "@/Shared/Container";
import useFetchData from "../Hooks/Api/UseFetchData";
import { motion, AnimatePresence } from "framer-motion";

const Bararea = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { data: baritem, isLoading } = useFetchData("/api/bar/list");
  console.log(baritem);

  const totalPages = Math.ceil(baritem?.data?.length / itemsPerPage) || 1;

  const paginatedItems = baritem?.data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
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

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-[#FFF] pt-[100px] pb-[89px]"
    >
      <Container>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-y-6 pb-10 mx-3">
          <h3 className="text-[32px] sm:text-[36px] md:text-[40px] lg:text-[48px] font-normal font-instrument text-[#000] leading-none">
            Bars in your area
          </h3>
          {/* <div className="w-full sm:w-[80%] md:w-[70%] lg:max-w-[392px] relative">
            <input
              type="text"
              placeholder="Search here"
              className="px-[20px] sm:px-[25px] md:px-[33px] py-4 sm:py-5 border border-[#DBA514] rounded-[8px] outline-none w-full"
            />
          </div> */}
        </div>
        {isLoading ? (
          <div className="flex flex-wrap gap-4 justify-between w-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 rounded-md w-[380px]  h-[260px]"
              ></div>
            ))}
          </div>
        ) : (
          <div className="relative min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-3"
              >
                {paginatedItems?.map((baritems, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link to={`/bar-drinks/${baritems.id}`}>
                      <div className="group rounded-[4px] border-2 border-[#DBA514] flex flex-col cursor-pointer h-full">
                        <figure className="w-full aspect-[393/218] overflow-hidden">
                          <img
                            src={
                              baritems?.cover_photo
                                ? `${import.meta.env.VITE_BASE_URL}/${
                                    baritems.cover_photo
                                  }`
                                : "/fallback.jpg"
                            }
                            alt={baritems?.name || "Bar Item"}
                            className="w-full group-hover:scale-110 transition-all duration-300 h-full object-center object-cover"
                          />
                        </figure>
                        <div className="px-3 pt-3 pb-[19px] group-hover:bg-black duration-300 ease-in-out rounded-b-[4px] flex flex-col justify-between flex-grow">
                          <div className="flex gap-x-1">
                            <CiLocationOn className="fill-black h-5 w-5 group-hover:fill-white" />
                            <h3 className="text-[14px] group-hover:text-[#FFF] text-black font-normal">
                              {baritems.address}
                            </h3>
                          </div>
                          <h2 className="text-[24px] group-hover:text-[#FFF] text-black font-normal pt-2 pb-1 font-instrument">
                            {baritems.name}
                          </h2>
                          <p className="group-hover:text-[#FFF] text-black text-[16px] font-normal">
                            {baritems.description}
                          </p>
                          <div className="flex justify-between pt-[14px] items-center">
                            <div className="group-hover:text-white text-black">
                              {renderStars(baritems.rating)}
                            </div>
                            <p className="text-[16px] group-hover:text-[#FFF] text-black font-normal">
                              {baritems.opening_at}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        <div className="hidden sm:flex justify-center mt-10 ">
          <div className="flex gap-x-2 items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#DBA514] text-white rounded-lg disabled:opacity-50 cursor-pointer"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 text-sm sm:text-base rounded-md cursor-pointer ${
                    page === currentPage
                      ? "bg-[#000] text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[#DBA514] text-white rounded-lg disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </Container>
    </motion.section>
  );
};

export default Bararea;
