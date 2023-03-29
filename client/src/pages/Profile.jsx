import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../store";
import { MdAccountCircle } from "react-icons/md";
import { getDaysLeft } from "../utils";

const Profile = () => {
  const navigate = useNavigate();
  const { username, campaigns } = useContext(StoreContext);

  const myCampaigns = useMemo(() => {
    return campaigns.filter(({ owner }) => owner === username);
  }, [campaigns]);

  const getIndex = (title) => {
    return campaigns.findIndex((campaign) => campaign.title === title);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="font-bold">Your Campaigns ({myCampaigns.length})</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
        {myCampaigns.map((campaign, index) => (
          <div
            key={index}
            onClick={() =>
              navigate(`/campaigns/details/${getIndex(campaign.title)}`)
            }
            className="group rounded-lg overflow-hidden bg-zinc-800 cursor-pointer hover:bg-zinc-700"
          >
            <div className="w-full h-60 rounded-lg overflow-hidden">
              <img
                className="transition-all group-hover:scale-100 group-hover:grayscale-0 scale-110 grayscale-[50%] w-full h-full object-cover"
                src={`https://picsum.photos/${
                  1000 + getIndex(campaign.title)
                }/${500 + getIndex(campaign.title)}`}
                alt={campaign.title}
              />
            </div>
            <div className="flex flex-col p-8 gap-4">
              <div>
                <div className="font-bold text-2xl truncate">
                  {campaign.title}
                </div>
                <div className="truncate text-zinc-500 italic">
                  {campaign.story}
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
                  <span className="font-bold">{campaign.owner}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
