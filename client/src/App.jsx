import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile"
import CreateCampaign from "./pages/CreateCampaign";
import CampaignDetails from "./pages/CampaignDetails";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

const App = () => {
  return (
    <div className="relative sm:p-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden relative mr-10">
        <SideBar />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />

        </Routes>
      </div>
    </div>
  );
};

export default App;
