import { GrowthIcon } from "@/assets/icons/icons";
import SalesChart from "@/Components/CustomComponents/SalesChart";
import { Input } from "@/Components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const PurchaseCost = () => {
  const [costTable, setCostTable] = useState(false);
  const inventoryData = [
    {
      id: "#5464",
      productName: "Mouton Mmsik Code",
      cost: 100.99,
      sellingPrice: 100.99,
      date: "12/12/2024",
      time: "8:00 PM",
      assignedBy: "Jack toole",
      categories: "Wine",
      shelfNumber: 3,
      note: "Note here",
      image: "https://i.ibb.co.com/84S5d37z/bottole.png",
    },
    {
      id: "#5464",
      productName: "Mouton Cadet Bordeaux Rouge",
      cost: 100.99,
      sellingPrice: 100.99,
      date: "12/12/2024",
      time: "8:00 PM",
      assignedBy: "Jack toole",
      categories: "Wine",
      shelfNumber: 3,
      note: "Note here",
      image: "https://i.ibb.co.com/84S5d37z/bottole.png",
    },
    {
      id: "#5464",
      productName: "Mouton Cadet Bordeaux Rouge",
      cost: 100.99,
      sellingPrice: 100.99,
      date: "12/12/2024",
      time: "8:00 PM",
      assignedBy: "Jack toole",
      categories: "Wine",
      shelfNumber: 3,
      note: "Note here",
      image: "https://i.ibb.co.com/84S5d37z/bottole.png",
    },
    {
      id: "#5464",
      productName: "Mouton Cadet Bordeaux Rouge",
      cost: 100.99,
      sellingPrice: 100.99,
      date: "12/12/2024",
      time: "8:00 PM",
      assignedBy: "Jack toole",
      categories: "Wine",
      shelfNumber: 3,
      note: "Note here",
      image: "https://i.ibb.co.com/84S5d37z/bottole.png",
    },
    {
      id: "#5464",
      productName: "Mouton Cadet Bordeaux Rouge",
      cost: 100.99,
      sellingPrice: 100.99,
      date: "12/12/2024",
      time: "8:00 PM",
      assignedBy: "Jack toole",
      categories: "Wine",
      shelfNumber: 3,
      note: "Note here",
      image: "https://i.ibb.co.com/84S5d37z/bottole.png",
    },
    {
      id: "#5464",
      productName:
        "Mouton Cadet Bordeaux Rouge Mouton Cadet Bordeaux RougeMouton Cadet Bordeaux Rou geMouton Cadet Bordeaux Rouge Cadet Bordeaux Rou geMouton Cadet Bordeaux Rouge",
      cost: 100.99,
      sellingPrice: 100.68,
      date: "12/12/2024",
      time: "8:00 PM",
      assignedBy: "Jack toole",
      categories: "Wine",
      shelfNumber: 3,
      note: "Note here",
      image: "https://i.ibb.co.com/84S5d37z/bottole.png",
    },
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(inventoryData);

  // Filter data when search query changes
  useEffect(() => {
    const searchString = searchQuery.toLowerCase().trim();

    if (searchString === "") {
      setFilteredData(inventoryData);
    } else {
      const filtered = inventoryData.filter((item) => {
        return (
          item.productName.toLowerCase().includes(searchString) ||
          item.id.toLowerCase().includes(searchString) ||
          item.assignedBy.toLowerCase().includes(searchString) ||
          item.categories.toLowerCase().includes(searchString) ||
          item.note.toLowerCase().includes(searchString) ||
          item.date.includes(searchString) ||
          item.time.toLowerCase().includes(searchString) ||
          item.shelfNumber.toString().includes(searchString) ||
          item.cost.toString().includes(searchString) ||
          item.sellingPrice.toString().includes(searchString)
        );
      });
      setFilteredData(filtered);
    }
  }, [searchQuery]);

  return (
    <>
      <h2 className="text-xl font-semibold mt-10 mb-6">Purchase cost</h2>
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="card w-full bg-[#FAFAFA] border border-[#C8C8C8] rounded-[7px] p-5 space-y-6">
          <h4 className="font-instrument  tracking-[0.668px] text-[22px]">
            Total Purchase Cost today
          </h4>
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">$1900.99</p>
            <button
              type="button"
              onClick={() => setCostTable((prev) => !prev)}
              className="bg-[linear-gradient(92deg,#DBA514_2.3%,#EEB609_35.25%,#FCC201_97.79%)] text-lg font-medium text-black px-4 py-1.5 leading-none rounded-md hover:shadow-xl cursor-pointer"
            >
              See details
            </button>
          </div>
        </div>
      </div>
      {costTable ? (
        <div className="container mx-auto mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">All Purchases today</h1>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search here"
                className="w-64 pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Inline handler instead of separate function
              />
            </div>
          </div>

          <div className="border">
            <Table>
              <TableHeader className="bg-black text-white">
                <TableRow>
                  <TableHead className="font-medium py-4 text-nowrap w-[400px]">
                    Product
                  </TableHead>
                  <TableHead className="font-medium py-4 text-center text-nowrap">
                    Product Id
                  </TableHead>
                  <TableHead className="font-medium py-4 text-center text-nowrap">
                    Cost
                  </TableHead>
                  <TableHead className="font-medium py-4 text-center text-nowrap">
                    Selling price
                  </TableHead>
                  <TableHead className="font-medium py-4 text-center text-nowrap">
                    Date
                  </TableHead>
                  <TableHead className="font-medium py-4 text-center text-nowrap">
                    Time
                  </TableHead>
                  <TableHead className="font-medium py-4 w-[250px] text-center text-nowrap">
                    Assigned by
                  </TableHead>
                  <TableHead className="font-medium py-4 text-center">
                    Categories
                  </TableHead>
                  <TableHead className="font-medium py-4 w-[120px] text-center text-nowrap">
                    Shelf Number
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <TableRow
                      key={index}
                      className="border-t border-gray-200 bg-[#FAFAFA]"
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2 text-wrap">
                          <figure className="w-13 border py-1 overflow-hidden rounded-[3px] flex-shrink-0">
                            <img
                              src={item.image}
                              alt="Wine bottle"
                              width={32}
                              height={48}
                              className="object-cover object-center w-full h-full"
                            />
                          </figure>
                          {item.productName}
                        </div>
                      </TableCell>
                      <TableCell className="text-center text-nowrap">
                        id: {item.id}
                      </TableCell>
                      <TableCell className="text-center text-nowrap font-semibold">
                        ${item.cost.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center text-nowrap">
                        ${item.sellingPrice.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center text-nowrap">
                        {item.date}
                      </TableCell>
                      <TableCell className="text-center text-nowrap">
                        {item.time}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.assignedBy}
                      </TableCell>
                      <TableCell className="text-center text-nowrap">
                        {item.categories}
                      </TableCell>
                      <TableCell className="text-center text-nowrap font-semibold">
                        {item.shelfNumber}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-4">
                      No results found for {searchQuery}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <section className="bg-[#F8F8FF] border border-[#DBA514] rounded-md overflow-hidden py-8 px-12">
          <h3 className="text-2xl font-bold font-poppins mb-8">
            Purchase cost
          </h3>
          <SalesChart className="bg-transparent" gold={true} />
          <div className="w-fit mx-auto mt-5">
            <p className="text-[#606060] font-medium inline-flex gap-1 items-center mb-[22px] p-2.5 border border-[#C8C8C8] rounded-[8px]">
              <GrowthIcon />
              <span className="text-[#00B69B] ">8.5% </span> Up from yesterday
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default PurchaseCost;
