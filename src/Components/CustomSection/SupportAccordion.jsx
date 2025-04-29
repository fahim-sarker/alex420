import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion2";
import useFetchData from "../Hooks/Api/UseFetchData";

const items = [
  {
    id: 1,
    value: "item-1",
    title: "How is Sipawayy different from other eCommerce platforms?",
    text: "Yes, you can connect your existing domain. Uvodo also provides a forever uvo.do domain suffix to all sellers upon creating an account.",
  },
];
const SupportAccordion = () => {
  const [itemsCount, setItemsCount] = useState(3);
  const userToken = JSON.parse(localStorage.getItem("usertoken"));
  const token = userToken?.token;
  const { data } = useFetchData("/api/dashboard/settings/faq", token);
  console.log(data);

  return (
    <div>
      <Accordion type="multiple" collapsible>
        {data?.data?.map((item) => (
          <AccordionItem key={item.id} value={`support-${item.id}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className=" flex items-center justify-center gap-10 mt-5">
        {itemsCount === 3 && (
          <button
            type="button"
            className="text-lg font-medium text-[#0E0E0E] cursor-pointer bg-[linear-gradient(92deg,#DBA514_2.3%,#EEB609_35.25%,#FCC201_97.79%)] py-3.5 px-7 rounded-[6px] w-[180px]"
            onClick={() => setItemsCount(console.log(items.length))}
          >
            See all
          </button>
        )}
        <button
          type="button"
          className="text-lg font-medium text-[#0E0E0E] cursor-pointer bg-[linear-gradient(92deg,#DBA514_2.3%,#EEB609_35.25%,#FCC201_97.79%)] py-3.5 px-7 rounded-[6px] w-[180px]"
        >
          Contact
        </button>
      </div>
    </div>
  );
};

export default SupportAccordion;
