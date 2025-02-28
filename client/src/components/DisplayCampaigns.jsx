import React from "react";
import { useNavigate } from "react-router-dom";
import { loader, tagType, thirdweb } from "../assets";
import { daysLeft } from "../utils";

const DisplayCampaigns = ({ title, campaigns, isLoading }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] mb-[20px] text-white text-left">
        {title} ( {campaigns.length} )
      </h1>

      {isLoading && (
        <div className="flex flex-wrap mt-[20px] gap-[26px]">
          <img
            src={loader}
            alt="loading"
            className="h-[100px] w-[100px] object-contain  "
          />
        </div>
      )}

      {!isLoading && campaigns.length === 0 && (
        <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183] ">
          You Have Not Created Any Campaigns Yet
        </p>
      )}

      {!isLoading &&
        campaigns.length > 0 &&
        campaigns.map((campaign) => (
          <FundCard
            key={campaign.pId}
            {...campaign}
            handleClick={() => handleNavigate(campaign)}
          />
        ))}
    </div>
  );
};

const FundCard = ({
  owner,
  title,
  description,
  image,
  deadline,
  amountCollected,
  target,
  handleClick,
}) => {
  const remainingDays = daysLeft(deadline);
  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer hover:scale-105 transition-all duration-200 "
      onClick={handleClick}
    >
      <img
        src={image}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-[15px]"
      />

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <img
            src={tagType}
            alt="tag"
            className="w-[17px] h-[17px] object-contain"
          />
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
            Education
          </p>
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
            {title}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
            {description}
          </p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {amountCollected}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Raised of {target}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {remainingDays}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Days Left
            </p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img
              src={thirdweb}
              alt="user"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
            by <span className="text-[#b2b3bd]">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisplayCampaigns;
