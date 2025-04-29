import Hero from "@/Components/Bar/Hero";
import Drinks from "@/Components/Bardrinks/Drinks";
import FeaturedDrinks from "@/Components/Bardrinks/FeaturedDrinks";
import Premiumdrinks from "@/Components/Bardrinks/Premiumdrinks";
import DialogReceipt from "@/Components/CustomSection/DialogReceipt";
import { useState } from "react";
import { useParams } from "react-router-dom";

const BarDrinks = () => {
  const [receipt, setReceipt] = useState(false);
  const barId = useParams();
  console.log(barId);
  

  return (
    <>
      <Hero />
      <Drinks barId={barId}  receipt={receipt} setReceipt={setReceipt} />
      <FeaturedDrinks />
      <Premiumdrinks />
      <DialogReceipt receipt={receipt} setReceipt={setReceipt} />
    </>
  );
};

export default BarDrinks
