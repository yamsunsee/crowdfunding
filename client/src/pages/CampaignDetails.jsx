import { useEffect, useState } from "react";
import {
  MdAccountCircle,
  MdCalendarMonth,
  MdDeleteForever,
} from "react-icons/md";
import { FaDonate } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../store";
import { Copyable } from "../components";
import { getDaysLeft, getPercent } from "../utils";

const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contract, address, getCampaign, donateToCampaign } = useStore();
  const [campaign, setCampaign] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [amount, setAmount] = useState();

  useEffect(() => {
    if (contract) fetchCampaign();
  }, [contract, address]);

  const fetchCampaign = async () => {
    setLoading(true);
    const data = await getCampaign(id);
    setCampaign(data);
    setLoading(false);
  };

  const fundCampaign = async () => {
    if (amount <= 0) return;
    const data = await donateToCampaign(id, amount);
    fetchCampaign();
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4">
        <div className="h-96 relative rounded-t-lg overflow-hidden flex-grow">
          <img
            className="w-full h-full object-cover"
            src={campaign.image}
            alt={campaign.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent top-0 left-0 p-8 flex items-end">
            <div className="font-bold text-5xl">{campaign.title}</div>
          </div>
          <div
            className="percent"
            style={{
              "--value": getPercent(campaign.amountCollected, campaign.target),
            }}
          ></div>
        </div>
        <div className="flex-shrink-0 grid grid-rows-3 gap-4">
          <div className="flex flex-col rounded-lg overflow-hidden">
            <div className="flex-grow font-bold text-2xl bg-zinc-800 flex justify-center items-center">
              {getDaysLeft(campaign.deadline)}
            </div>
            <div className="px-4 py-2 italic bg-zinc-700 flex justify-center items-center text-zinc-400">
              Days Left
            </div>
          </div>
          <div className="flex flex-col rounded-lg overflow-hidden">
            <div className="flex-grow font-bold text-2xl bg-zinc-800 flex justify-center items-center">
              {campaign.amountCollected}
            </div>
            <div className="px-4 py-2 italic bg-zinc-700 flex justify-center items-center text-zinc-400">
              Raised of {campaign.target}
            </div>
          </div>
          <div className="flex flex-col rounded-lg overflow-hidden">
            <div className="flex-grow font-bold text-2xl bg-zinc-800 flex justify-center items-center">
              {campaign.donators?.length}
            </div>
            <div className="px-4 py-2 italic bg-zinc-700 flex justify-center items-center text-zinc-400">
              Total Donations
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-8 justify-between flex-col lg:flex-row">
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-2">
            <div className="uppercase text-2xl font-bold flex justify-between">
              <div>Creator</div>
              <div>Deadline</div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <MdAccountCircle className="text-2xl" />
                <div className="italic flex gap-1">
                  <span className="text-zinc-500">by</span>{" "}
                  <span className="font-bold">
                    <Copyable string={campaign.owner} position="right" />
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MdCalendarMonth className="text-2xl" />
                <div className="font-bold text-zinc-500">
                  {campaign.deadline}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="uppercase text-2xl font-bold">description</div>
            <div className="italic text-zinc-500">{campaign.description}</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="uppercase text-2xl font-bold">Donations</div>
            <div className="italic text-zinc-500 w-full flex flex-col">
              {campaign.donators?.map((backer, index) => (
                <div
                  key={index}
                  className={`flex justify-between px-8 py-4 border-b border-zinc-800 hover:bg-zinc-800`}
                >
                  <div className="flex gap-1">
                    <div>{index + 1}.</div>
                    <Copyable string={backer} position="right" />
                  </div>
                  <div>{campaign.donations[index]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-shrink-0">
          <div className="uppercase text-2xl font-bold">Fund</div>
          {campaign.owner === address ? (
            <div className="bg-zinc-800 w-[30rem] self-center p-8 rounded-lg flex flex-col gap-4 items-center">
              <div className="font-bold text-2xl text-zinc-500">
                End the crowdfunding process
              </div>
              <div className="bg-zinc-900 p-8 rounded-lg w-full">
                <div className="font-bold text-xl text-zinc-400">
                  Congratulations on your efforts.
                </div>
                <div className="italic text-zinc-500">
                  The rest of funds will transfer to your wallet after deducting
                  the gas cost!
                </div>
              </div>
              <div className="button delete">
                <MdDeleteForever />
                <div>Get the funds</div>
              </div>
            </div>
          ) : (
            <div className="bg-zinc-800 w-[30rem] self-center p-8 rounded-lg flex flex-col gap-4 items-center">
              <div className="font-bold text-2xl text-zinc-500">
                Pledge without reward
              </div>
              <input
                className="placeholder:text-zinc-500 w-full bg-zinc-800 focus:outline-none rounded-lg px-8 py-4 text-white border-zinc-700 border font-bold text-2xl"
                type="number"
                step="0.01"
                min="0"
                placeholder="ETH 0.01"
                onChange={(event) => setAmount(event.target.value)}
              />
              <div className="bg-zinc-900 p-8 rounded-lg w-full">
                <div className="font-bold text-xl text-zinc-400">
                  Back it because you believe in it.
                </div>
                <div className="italic text-zinc-500">
                  Support the project for no reward, just because it speaks to
                  you.
                </div>
              </div>
              <div
                onClick={fundCampaign}
                className={`button${amount > 0 && address ? "" : " disabled"}`}
              >
                <FaDonate />
                <div>Fund campaign</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
