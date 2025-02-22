import { Link, useNavigate } from "react-router-dom";
import { logo, sun } from "../assets";
import { navlinks } from "../constants";
import { useState } from "react";

const SideBar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");

  return (
    <div className="flex flex-col justify-between items-center h-[93vh] top-5 sticky ">
      <Link to={"/"}>
        <Icon styles="h-[52px] w-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12 " >
        <div className="flex justify-center flex-col items-center gap-3" >
          {navlinks.map((link) => (
            <Icon key={link.name} {...link} isActive={isActive} handleClick={() => {
              if(!link.disabled) {
                setIsActive(link.name);
                navigate(link.link);
              }
            }} />
          ))}
        </div>

        <Icon styles="h-[40px] w-[40px] bg-[#1c1c24] shadow-secondary " imgUrl={sun} />
      </div>
    </div>
  );
};

const Icon = ({ styles, imgUrl, name, isActive, disabled, handleClick }) => (
  <div
    className={`h-[48px] w-[48px] rounded-[10px] ${
      isActive && isActive === name && "bg-[#2c2f32]"
    } flex justify-center items-center ${!disabled && "cursor-pointer"} ${styles}`} onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className=" w-1/2  h-1/2" />
    ) : (
      <img src={imgUrl} alt="fund_logo" className={`w-1/2  h-1/2 ${isActive !== name && 'grayscale'}` } />
    )}
  </div>
);

export default SideBar;
