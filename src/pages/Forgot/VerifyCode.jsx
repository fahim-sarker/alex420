import Container from "@/Shared/Container";
import { useState } from "react";
import Signupbg from "../../assets/images/Signup/signupmainbg.png";
import useAxios from "@/Components/Hooks/Api/Useaxios";
import toast from "react-hot-toast";
import { PiSpinnerBold } from "react-icons/pi";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyCode = () => {
  const Axios = useAxios();
  const Navigate = useNavigate();
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(value);
  const location = useLocation();
  const email = location.state?.email;
  const userToken = JSON.parse(localStorage.getItem("usertoken"));
  const token = userToken?.token;
  console.log(email);

  const onSubmit = async () => {
    if (!value || value.length < 4) {
      toast.error("Please enter the full 4-digit OTP");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await Axios.post(
        "/api/verify-otp",
        {
          email: email,
          otp: value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      toast.success("Verified successfully");
      Navigate("/reset-password", { state: { email } });
    } catch (error) {
      console.error("Verification failed:", error.message);
      toast.error("Wrong OTP or verification failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#000]  h-screen flex items-center">
      <Container className="py-[60px] rounded-[6px] font-poppins w-full">
        <div className="flex gap-x-20 justify-between">
          <div className="w-[40%]">
            <h3 className="text-[30px] text-[#FFF] font-normal font-instrument">
              Verify your
              <span className="text-[#EEB609]"> Email Address</span>
            </h3>
            <p className="text-[16px] text-[#F8F8FF] font-normal font-itc mt-2">
              Enter the verification code we sent to
            </p>
            <p className="text-[16px] text-[#EEB609] font-normal font-itc mt-4 cursor-pointer">
              {email}
            </p>
            <div className="text-white mt-8 !text-2xl">
              <InputOTP
                maxLength={4}
                pattern={REGEXP_ONLY_DIGITS}
                value={value}
                onChange={(value) => setValue(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={1} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <p className="text-white font-itc mt-6">
              Your verification code may take a few moments to arrive
              Didn&apos;t receive a verification code?{" "}
              <span
                onClick={async () => {
                  try {
                    await Axios.post("/api/resend-otp", { email });
                    toast.success("OTP resent successfully");
                  } catch (error) {
                    console.log(error);
                    
                    toast.error("Failed to resend OTP");
                  }
                }}
                className="hover:underline text-lg text-[#FCC201] cursor-pointer"
              >
                Re-send
              </span>
            </p>
            <div className="">
              <button
                onClick={onSubmit}
                type="submit"
                disabled={isSubmitting}
                className="flex justify-center items-center leading-none py-[16px] px-[32px] capitalize font-semibold text-[16 px] rounded-lg bg-[linear-gradient(92deg,_#DBA514_2.3%,_#EEB609_35.25%,_#C69320_66.76%,_#FCC201_97.79%)] backdrop-blur-[6.5px] text-[#0E0E0E] cursor-pointer tracking-[0.72px] w-full mt-8"
              >
                {isSubmitting ? (
                  <PiSpinnerBold className="animate-spin size-[16px] fill-white" />
                ) : (
                  "Verify"
                )}
              </button>
              <button
                type="submit"
                onClick={() => Navigate(-1)}
                className="flex justify-center items-center leading-none py-[16px] px-[32px] capitalize font-medium text-[16 px] rounded-lg border border-[#DBA514] backdrop-blur-[6.5px] text-white cursor-pointer tracking-[0.72px] w-full mt-4"
              >
                Back
              </button>
            </div>
          </div>
          <div className="">
            <img src={Signupbg} alt="Signupbg" className="w-full" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default VerifyCode;
