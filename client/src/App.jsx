import { Route, Routes } from "react-router-dom";
import { Navbar, Footer } from "./components";
import { Home, Profile, CreateCampaign, CampaignDetails } from "./pages";

function App() {
  return (
    <div className="w-full bg-zinc-900 text-white flex flex-col items-center select-none">
      <div className="p-8 w-full max-w-[120rem] min-h-screen flex flex-col gap-8">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/campaigns/create" element={<CreateCampaign />} />
          <Route path="/campaigns/details/:id" element={<CampaignDetails />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
