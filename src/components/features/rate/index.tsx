import React from "react";
import Image from "next/image";

import star from "@/image/icon/star-svgrepo-com.svg";

interface RateProps {
  rating: number;
}

const Rate: React.FC<RateProps> = ({ rating }) => {
  const stars = Array.from({ length: rating }, (_, index) => {
    if (index < rating) {
      return <Image key={index} src={star} alt="star" className="w-4 h-4" />;
    } else {
      return <Image key={index} src={star} alt="star" className="w-4 h-4 opacity-50" />;
    }
  });

  return <div className="flex justify-center gap-1">{stars}</div>;
};

export default Rate;
