import { useState, useEffect } from "react";
import { useStateContext } from "../context";
import DisplayCampaigns from "../components/DisplayCampaigns";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const { address, contract, getCampaigns } = useStateContext();
  const [campaigns, setCampaigns] = useState([]);

  const fetchCampaigns = async () => {
    setLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <DisplayCampaigns
      title={"All Campaigns"}
      isLoading={loading}
      campaigns={campaigns}
    />
  );
};

export default Home;
