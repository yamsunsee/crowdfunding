import { useLocation, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdAccountCircle,
  MdCampaign,
  MdMonetizationOn,
  MdKey,
} from "react-icons/md";
import { TbPlugConnected } from "react-icons/tb";
import { useContext } from "react";
import { StoreContext } from "../store";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isConnected } = useContext(StoreContext);

  return (
    <nav className="flex items-center justify-between">
      {pathname !== "/" && (
        <div
          onClick={() => navigate("/")}
          className="p-2 bg-zinc-800 flex justify-center items-center rounded-lg cursor-pointer hover:bg-zinc-700"
        >
          <MdDashboard className="text-5xl" />
        </div>
      )}
      <div
        onClick={() => navigate("/")}
        className="spin-group cursor-pointer px-8 py-4 bg-zinc-800 flex justify-center items-center rounded-full font-bold uppercase tracking-widest text-3xl"
      >
        <div>Cr</div>
        <MdMonetizationOn className="spin ml-[-2px] text-4xl text-yellow-500" />
        <div>wdfund</div>
        <MdKey className="rotate-90 text-yellow-500 ml-[-6px] -mr-1" />
        <div>ng</div>
      </div>
      <div className="flex gap-4 items-center">
        {!isConnected && (
          <div className="button">
            <TbPlugConnected />
            <div>Connect to wallet</div>
          </div>
        )}
        {pathname !== "/campaigns/create" && (
          <div onClick={() => navigate("/campaigns/create")} className="button">
            <MdCampaign />
            <div className="font-bold hidden lg:inline-block whitespace-nowrap">
              Create a campaign
            </div>
          </div>
        )}
        <div
          onClick={() => navigate("/profile")}
          className="hover:bg-zinc-700 cursor-pointer p-2 bg-zinc-800 flex justify-center items-center rounded-lg"
        >
          <MdAccountCircle className="text-5xl" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
