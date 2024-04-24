import React from "react";
import Image from "next/image";

import star from "@/image/icon/star-svgrepo-com.svg";

interface RateProps {
  rating: number;
}

const Rate: React.FC<RateProps> = ({ rating }) => {
  return (
    <ul className="flex justify-center gap-0.5">
      {Array(rating)
        .fill(null)
        .map((_, index) => (
          <li key={index}>
            <Image src={star} alt="star" className="w-3.5 h-3.5 grayscale-0" />
          </li>
        ))}
      {[...Array(Math.max(5 - rating, 0))].map((_, index) => (
        <li key={index + rating}>
          <Image src={star} alt="star" className="w-3.5 h-3.5 grayscale" />
        </li>
      ))}
    </ul>
  );
};

export default Rate;
