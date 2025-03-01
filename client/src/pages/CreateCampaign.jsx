import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import Loader from "../components/Loader";
import { money } from "../assets";
import CustomButton from "../components/CustomButton";
import { checkIfImage } from "../utils";
import { useStateContext } from "../context";
import FormField from "../components/FormField";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    title: "",
    name: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const handleFormFieldchange = (fieldName, e) => {
    setForm({
      ...form,
      [fieldName]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setLoading(false);
        navigate("/");
      } else {
        alert("Provide a valid Image Url");
        setForm({ ...form, image: "" });
      }
    });
  
   // console.log("Form Submitted", form);
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col sm:p-10 p-4 rounded-xl ">
      {loading && <Loader />}
      <div className="p-4 flex justify-center items-center sm:max-w-[380px] rounded-xl bg-[#3a3a43] ">
        <h1 className="font-epilogue font-bold text-white text-[18px] sm:text-[25px] leading-[38px] ">
          Create a Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] gap-[30px] flex flex-col "
      >
        <div className="flex flex-wrap gap-[40px] ">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldchange("name", e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a Title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldchange("title", e)}
          />
        </div>

        <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldchange("description", e)}
        />

        <div className="w-full flex justify-start  p-4 bg-[#8c6dfd] rounded-xl items-center  h-[120px]">
          <img
            src={money}
            alt="money"
            className="h-[40px] w-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px] ">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="number"
            value={form.target}
            handleChange={(e) => handleFormFieldchange("target", e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="Deadline"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldchange("deadline", e)}
          />
        </div>

        <FormField
          labelName="Campaign image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldchange("image", e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
