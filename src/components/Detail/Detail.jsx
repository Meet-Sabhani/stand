import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import DetailCard from "./DetailCard";

const Detail = () => {
//   const { productId } = useParams();


  return (
    <>
      <Navbar />
      <DetailCard/>
    </>
  );
};

export default Detail;
