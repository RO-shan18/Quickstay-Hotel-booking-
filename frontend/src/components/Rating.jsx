import React from "react";
import { assets } from "../assets/assets";

const Rating = ({rating = 4}) => {
  return (
    <div className="flex gap-1">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <img key={index} src={rating > 3 ? assets.starIconFilled : assets.starIconOutlined} alt="starrating" />
        ))}
    </div>
  );
};

export default Rating;
