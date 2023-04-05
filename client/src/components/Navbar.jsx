import { useLocation, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdAccountCircle,
  MdCampaign,
  MdMonetizationOn,
  MdKey,
} from "react-icons/md";
import { TbPlugConnected } from "react-icons/tb";
import { useStore } from "../store";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { address, connect } = useStore();

  return (
    <nav className="flex flex-col gap-4 md:flex-row items-center justify-between">
      {pathname !== "/" && (
        <div
          onClick={() => navigate("/")}
          className="md:flex hidden p-2 bg-zinc-800 justify-center items-center rounded-lg cursor-pointer hover:bg-zinc-700"
        >
          <MdDashboard className="text-5xl" />
        </div>
      )}
      <div
        onClick={() => navigate("/")}
        className="spin-group cursor-pointer px-8 py-4 bg-zinc-800 flex justify-center items-center rounded-full font-bold uppercase tracking-widest text-2xl md:text-3xl"
      >
        <div>Cr</div>
        <MdMonetizationOn className="spin ml-[-2px] text-3xl md:text-4xl text-yellow-500" />
        <div>wdfund</div>
        <MdKey className="rotate-90 text-yellow-500 ml-[-6px] -mr-1" />
        <div>ng</div>
      </div>
      <div className="flex gap-4 items-center">
        {address ? (
          pathname !== "/campaigns/create" && (
            <div
              onClick={() => navigate("/campaigns/create")}
              className="button"
            >
              <MdCampaign />
              <div className="md:hidden lg:inline-block whitespace-nowrap">
                Create a campaign
              </div>
            </div>
          )
        ) : (
          <div onClick={connect} className="button">
            <TbPlugConnected />
            <div className="md:hidden lg:inline-block whitespace-nowrap">
              Connect to wallet
            </div>
          </div>
        )}
        {pathname !== "/profile" && (
          <div
            onClick={() => navigate("/profile")}
            className="hover:bg-zinc-700 cursor-pointer p-2 bg-zinc-800 flex justify-center items-center rounded-lg"
          >
            <MdAccountCircle className="text-4xl md:text-5xl" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
