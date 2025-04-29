import { GrowthIcon } from "@/assets/icons/icons";
import SalesChart from "@/Components/CustomComponents/SalesChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import useFetchData from "../Hooks/Api/UseFetchData";

const Revenue = ({ tabValue, setTabValue }) => {
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.tips.value);
  // };


  const userToken = JSON.parse(localStorage.getItem("usertoken"));
  const token = userToken?.token;
  const { data: solditem } = useFetchData(
    "/api/dashboard/bar/products/total-item-sold-today",
    token
  );
  
  const { data: earnings } = useFetchData(
    "/api/dashboard/bar/products/total-earnings-today",
    token
  );
  


  return (
    <>
      <Tabs value={tabValue} className="">
        <TabsContent value="section1">
          <h2 className="text-xl font-semibold mt-10 mb-6">Revenue</h2>
          <section className="space-y-7">
            <section className="bg-[#F8F8FF] border border-[#DBA514] rounded-md overflow-hidden py-6 px-6 sm:py-8 sm:px-10 lg:py-10 lg:px-16 xl:px-20">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-poppins mb-6 sm:mb-8">
                Total Revenue
              </h3>
              <SalesChart className="bg-transparent" gold={true} />
              <div className="w-fit mx-auto mt-4 sm:mt-5">
                <p className="text-[#606060] font-medium inline-flex gap-1 items-center mb-5 sm:mb-[22px] p-2 sm:p-2.5 border border-[#C8C8C8] rounded-[8px] text-sm sm:text-base">
                  <GrowthIcon />
                  <span className="text-[#00B69B]">8.5%</span> Up from yesterday
                </p>
              </div>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">
              <div className="card w-full bg-[#FAFAFA] border border-[#C8C8C8] rounded-[7px] p-5 space-y-6">
                <h4 className="font-instrument  tracking-[0.668px] text-[22px]">
                  Total Item sold today
                </h4>
                <div className="flex justify-between items-center">
                  <p className="text-xl font-semibold">{solditem?.data?.total_items_sold}</p>
                  <button
                    onClick={() => setTabValue("section2")}
                    className="bg-[linear-gradient(92deg,#DBA514_2.3%,#EEB609_35.25%,#FCC201_97.79%)] text-lg font-medium text-black px-4 py-1.5 leading-none rounded-md hover:shadow-xl cursor-pointer"
                  >
                    See details
                  </button>
                </div>
              </div>
              <div className="card w-full bg-[#FAFAFA] border border-[#C8C8C8] rounded-[7px] p-5 space-y-6">
                <h4 className="font-instrument  tracking-[0.668px] text-[22px]">
                  Total Earnings today
                </h4>
                <div className="flex justify-between items-center">
                  <p className="text-xl font-semibold">${earnings?.data?.total_earnings}</p>
                  <button
                    onClick={() => setTabValue("section2")}
                    className="bg-[linear-gradient(92deg,#DBA514_2.3%,#EEB609_35.25%,#FCC201_97.79%)] text-lg font-medium text-black px-4 py-1.5 leading-none rounded-md hover:shadow-xl cursor-pointer"
                  >
                    See details
                  </button>
                </div>
              </div>
              <div className="card w-full bg-[#FAFAFA] border border-[#C8C8C8] rounded-[7px] p-5 space-y-6">
                <h4 className="font-instrument  tracking-[0.668px] text-[22px]">
                  Total paid orders today
                </h4>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-xl gap-4">
                    <p className="">
                      orders: <span className="font-semibold">94</span>
                    </p>
                    <p className="">
                      Earning: <span className="font-semibold">$100.99</span>
                    </p>
                  </div>
                  <button
                    onClick={() => setTabValue("section2")}
                    className="bg-[linear-gradient(92deg,#DBA514_2.3%,#EEB609_35.25%,#FCC201_97.79%)] text-lg font-medium text-black px-4 py-1.5 leading-none rounded-md hover:shadow-xl cursor-pointer"
                  >
                    See details
                  </button>
                </div>
              </div>
              <div className="card w-full bg-[#FAFAFA] border border-[#C8C8C8] rounded-[7px] p-5 space-y-6">
                <h4 className="font-instrument  tracking-[0.668px] text-[22px]">
                  Total Hand cash orders today
                </h4>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-xl gap-4">
                    <p className="">
                      orders: <span className="font-semibold">94</span>
                    </p>
                    <p className="">
                      Earning: <span className="font-semibold">$100.99</span>
                    </p>
                  </div>
                  <button
                    onClick={() => setTabValue("section2")}
                    className="bg-[linear-gradient(92deg,#DBA514_2.3%,#EEB609_35.25%,#FCC201_97.79%)] text-lg font-medium text-black px-4 py-1.5 leading-none rounded-md hover:shadow-xl cursor-pointer"
                  >
                    See details
                  </button>
                </div>
              </div>
            </div>
          </section>
        </TabsContent>
        <TabsContent value="section2">
          <div className="my-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="card w-full bg-[#FAFAFA] border border-[#C8C8C8] rounded-[7px] p-5 space-y-6">
                <h4 className="font-instrument  tracking-[0.668px] text-[22px]">
                  Total Earnings today
                </h4>
                <div className="flex justify-between items-center">
                  <p className="text-xl font-semibold">$1900.99</p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="all" className="mt-12">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium">Served</h3>
                <TabsList className="flex items-center gap-2">
                  <TabsTrigger
                    value="all"
                    className="py-1 w-24 font-itc text-base text-[#0E0E0E] bg-[#E0E0E0] border-0"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="paid"
                    className="py-1 w-24 font-itc text-base text-[#0E0E0E] bg-[#E0E0E0] border-0"
                  >
                    Paid
                  </TabsTrigger>
                  <TabsTrigger
                    value="hand-cash"
                    className="py-1 w-24 font-itc text-base text-[#0E0E0E] bg-[#E0E0E0] border-0"
                  >
                    Hand cash
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="all">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
                  {Array(12)
                    .fill(null)
                    .map((_, idx) => (
                      <div key={idx} className="">
                        <div className="bg-[#fafafa] flex gap-2.5 text-[#181818] p-[18px] rounded-[6px] border border-[#C8C8C8]">
                          <div className="left shrink-0">
                            <figure className="w-[135px] h-full rounded-[6px] border border-[#C8C8C8] flex justify-center items-center">
                              <img
                                src="https://i.ibb.co.com/84S5d37z/bottole.png"
                                alt=""
                              />
                            </figure>
                          </div>
                          <div className="right text-sm grow">
                            <h3 className="text-xl tracking-[0.6px] font-instrument mb-2 line-clamp-1">
                              Mouton Cadet Bordeaux Rouge
                            </h3>
                            <div className="flex items-center justify-between">
                              <h4>Id: #5464</h4>
                              <div className="px-2 rounded-[4px] leading-none border border-[#DBA514]">
                                <p className="text-xs">Paid</p>
                              </div>
                            </div>
                            <h4>Table: 02</h4>
                            <div className="flex items-center justify-between">
                              <h4>Date : 12/12/2024</h4>
                              <h4>Time : 8.00 PM</h4>
                            </div>
                            <h4 className="mb-3">Quantity : 02</h4>
                            <div className="flex items-center justify-between">
                              <h3 className="text-xl font-semibold">$100.99</h3>
                              <button
                                type="button"
                                className={cn(
                                  `border border-transparent block py-1.5 px-6 rounded-[6px] text-center text-lg font-medium leading-none tracking-[0.54px] text-[#181818]`,
                                  {
                                    "bg-[#C8C8C8] border-[#C8C8C8] text-[#181818]":
                                      idx % 2,
                                    "bg-[#1F1F1F] border-[#1F1F1F] text-white":
                                      idx % 2 == 0,
                                  }
                                )}
                              >
                                {idx % 2 ? "Paid" : "Hand cash"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="paid">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
                  {Array(8)
                    .fill(null)
                    .map((_, idx) => (
                      <div key={idx} className="">
                        <div className="bg-[#fafafa] flex gap-2.5 text-[#181818] p-[18px] rounded-[6px] border border-[#C8C8C8]">
                          <div className="left shrink-0">
                            <figure className="w-[135px] h-full rounded-[6px] border border-[#C8C8C8] flex justify-center items-center">
                              <img
                                src="https://i.ibb.co.com/84S5d37z/bottole.png"
                                alt=""
                              />
                            </figure>
                          </div>
                          <div className="right text-sm grow">
                            <h3 className="text-xl tracking-[0.6px] font-instrument mb-2 line-clamp-1">
                              Mouton Cadet Bordeaux Rouge
                            </h3>
                            <div className="flex items-center justify-between">
                              <h4>Id: #5464</h4>
                              <div className="px-2 rounded-[4px] leading-none border border-[#DBA514]">
                                <p className="text-xs">Paid</p>
                              </div>
                            </div>
                            <h4>Table: 02</h4>
                            <div className="flex items-center justify-between">
                              <h4>Date : 12/12/2024</h4>
                              <h4>Time : 8.00 PM</h4>
                            </div>
                            <h4 className="mb-3">Quantity : 02</h4>
                            <div className="flex items-center justify-between">
                              <h3 className="text-xl font-semibold">$100.99</h3>
                              <button
                                type="button"
                                className="text-[#181818] bg-[#C8C8C8] font-medium py-1 w-18 rounded-[4px]"
                              >
                                Paid
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="hand-cash">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
                  {Array(8)
                    .fill(null)
                    .map((_, idx) => (
                      <div key={idx} className="">
                        <div className="bg-[#fafafa] flex gap-2.5 text-[#181818] p-[18px] rounded-[6px] border border-[#C8C8C8]">
                          <div className="left shrink-0">
                            <figure className="w-[135px] h-full rounded-[6px] border border-[#C8C8C8] flex justify-center items-center">
                              <img
                                src="https://i.ibb.co.com/84S5d37z/bottole.png"
                                alt=""
                              />
                            </figure>
                          </div>
                          <div className="right text-sm grow">
                            <h3 className="text-xl tracking-[0.6px] font-instrument mb-2 line-clamp-1">
                              Mouton Cadet Bordeaux Rouge
                            </h3>
                            <div className="flex items-center justify-between">
                              <h4>Id: #5464</h4>
                              <div className="px-2 rounded-[4px] leading-none border border-[#DBA514]">
                                <p className="text-xs">Paid</p>
                              </div>
                            </div>
                            <h4>Table: 02</h4>
                            <div className="flex items-center justify-between">
                              <h4>Date : 12/12/2024</h4>
                              <h4>Time : 8.00 PM</h4>
                            </div>
                            <h4 className="mb-3">Quantity : 02</h4>
                            <div className="flex items-center justify-between">
                              <h3 className="text-xl font-semibold">$100.99</h3>
                              <button
                                type="button"
                                className="text-white bg-[#1F1F1F] font-medium py-1 w-24 rounded-[4px]"
                              >
                                Hand Cash
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Revenue;
