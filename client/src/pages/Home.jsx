import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { MdAccountCircle } from "react-icons/md";
import { RiLoader4Line } from "react-icons/ri";
import { getDaysLeft, displayAddress } from "../utils";

const Home = () => {
  const navigate = useNavigate();
  const { contract, address, getCampaigns } = useStore();
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [contract, address]);

  const fetchCampaigns = async () => {
    setLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 flex-grow">
      <div className="font-bold">All Campaigns ({campaigns.length})</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
        {isLoading ? (
          <div className="flex text-zinc-500 italic items-center">
            <RiLoader4Line className="animate-spin" />
            <div>Loading...</div>
          </div>
        ) : (
          campaigns.map((campaign) => (
            <div
              key={campaign.id}
              onClick={() => navigate(`/campaigns/details/${campaign.id}`)}
              className="group rounded-lg overflow-hidden bg-zinc-800 cursor-pointer hover:bg-zinc-700"
            >
              <div className="w-full h-60 rounded-lg overflow-hidden">
                <img
                  className="transition-all group-hover:scale-100 group-hover:grayscale-0 scale-110 grayscale-[50%] w-full h-full object-cover"
                  src={campaign.image}
                  alt={campaign.title}
                />
              </div>
              <div className="flex flex-col p-8 gap-4">
                <div>
                  <div className="font-bold text-2xl truncate">
                    {campaign.title}
                  </div>
                  <div className="truncate text-zinc-500 italic">
                    {campaign.description}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <div className="font-bold">{campaign.amountCollected}</div>
                    <div className="text-zinc-500 italic">
                      Raised of {campaign.target}
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">
                      {getDaysLeft(campaign.deadline)}
                    </div>
                    <div className="text-zinc-500 italic">Days left</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MdAccountCircle className="text-4xl" />
                  <div className="truncate italic">
                    <span className="text-zinc-500">by</span>{" "}
                    <span className="font-bold">
                      {displayAddress(campaign.owner)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
