import TextWithReadMore from "@/Components/CustomComponents/TextWithReadMore";
import SupportAccordion from "@/Components/CustomSection/SupportAccordion";
import useFetchData from "@/Components/Hooks/Api/UseFetchData";
import NotifyBtn from "@/Components/ui/CustomUi/NotifyBtn";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

const UserSettings = () => {
  const [formData, setFormData] = useState({
    issue: "",
    confirmPassword: "",
  });
  const userToken = JSON.parse(localStorage.getItem("usertoken"));
  const token = userToken?.token;

  const { data } = useFetchData("/api/dashboard/settings/faq", token);
  console.log(data);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <section className="pt-12 px-4 sm:px-10 pb-16">
      <div className="w-full max-w-[600px] md:mx-auto xl:mx-6">
        <h2 className="text-xl md:text-3xl font-semibold mb-6">Settings</h2>

        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-medium tracking-[0.54px]">
            Notification
          </h3>
          <NotifyBtn height="h-5" />
        </div>

        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-medium tracking-[0.54px]">Messaging</h3>
          <NotifyBtn height="h-5" />
        </div>

        <div>
          <Accordion
            type="multiple"
            defaultValue={["item-4", "item-5"]}
            collapsible="true"
          >
            <AccordionItem value="item-2">
              <AccordionTrigger>Privacy policy</AccordionTrigger>
              <AccordionContent className="py-6 border border-[#C8C8C8] rounded-[4px] pl-6 pr-4 sm:pr-12">
                <TextWithReadMore wordLimit="170">
                  {/* Your content */}
                </TextWithReadMore>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Terms & conditions</AccordionTrigger>
              <AccordionContent className="py-6 border border-[#C8C8C8] rounded-[4px] pl-6 pr-4 sm:pr-12">
                <TextWithReadMore wordLimit="220">
                  {/* Your content */}
                </TextWithReadMore>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Support & help</AccordionTrigger>
              <AccordionContent>
                <SupportAccordion />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Account deactivate</AccordionTrigger>
              <AccordionContent>
                <form
                  className="mx-1 flex flex-col gap-5 items-center"
                  onSubmit={handleSubmit}
                >
                  <div className="w-full">
                    <Label
                      htmlFor="issue"
                      className="block mb-2 font-medium text-[#353B48] md:text-base"
                    >
                      State your issue here
                    </Label>
                    <Input
                      id="issue"
                      className="w-full h-[56px] bg-white"
                      value={formData.issue}
                      onChange={(e) => updateFormData("issue", e.target.value)}
                    />
                  </div>

                  <div className="w-full">
                    <Label
                      htmlFor="confirm-password"
                      className="block mb-2 font-medium text-[#353B48] md:text-base"
                    >
                      Confirm Password
                    </Label>
                    <Input
                      id="confirm-password"
                      className="w-full h-[56px] bg-white"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        updateFormData("confirmPassword", e.target.value)
                      }
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="text-lg font-medium text-[#0E0E0E] cursor-pointer bg-[linear-gradient(92deg,#DBA514_2.3%,#EEB609_35.25%,#FCC201_97.79%)] py-3.5 px-7 rounded-[6px] w-[180px]"
                  >
                    Deactivated
                  </button>
                </form>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default UserSettings;
