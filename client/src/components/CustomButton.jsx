import React from "react";

const CustomButton = ({ btnType, styles, title, handleClick }) => {
  return (
    <button className={` ${styles} rounded-lg p-4 font-epilogue font-semibold text-[16px] leading-[24px] text-white min-h-[52px] `} type={btnType} onClick={handleClick}>
      {title}
    </button>
  );
};

export default CustomButton;
