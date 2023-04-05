import { useEffect, useState } from "react";
import {
  MdAccountCircle,
  MdCalendarMonth,
  MdPowerSettingsNew,
} from "react-icons/md";
import { FaDonate } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useStore } from "../store";
import { Copyable } from "../components";
import { getDaysLeft, getPercent } from "../utils";
import { RiLoader4Line } from "react-icons/ri";

const CampaignDetails = () => {
  const { id } = useParams();
  const {
    contract,
    address,
    getCampaign,
    donateToCampaign,
    changeCampaignStatus,
  } = useStore();
  const [campaign, setCampaign] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [amount, setAmount] = useState();

  useEffect(() => {
    if (contract) fetchCampaign();
  }, [contract, address]);

  const fetchCampaign = async () => {
    const data = await getCampaign(id);
    setCampaign(data);
  };

  const fundCampaign = async () => {
    if (amount <= 0 || isLoading) return;
    setLoading(true);
    const data = await donateToCampaign(id, amount);
    fetchCampaign();
    setLoading(false);
  };

  const handleChangeStatus = async (status) => {
    if (isLoading) return;
    setLoading(true);
    const isSuccess = await changeCampaignStatus(id, status);
    if (isSuccess) fetchCampaign();
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="h-96 relative rounded-t-lg overflow-hidden flex-grow">
          <img
            className="w-full h-full object-cover"
            src={campaign.image}
            alt={campaign.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent top-0 left-0 p-4 md:p-8 flex items-end">
            <div className="font-bold text-4xl md:text-5xl text-center">
              {campaign.title}
            </div>
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
            <div className="p-4 flex-grow font-bold text-2xl bg-zinc-800 flex justify-center items-center">
              {getDaysLeft(campaign.deadline)}
            </div>
            <div className="px-4 py-2 italic bg-zinc-700 flex justify-center items-center text-zinc-400">
              Days Left
            </div>
          </div>
          <div className="flex flex-col rounded-lg overflow-hidden">
            <div className="p-4 flex-grow font-bold text-2xl bg-zinc-800 flex justify-center items-center">
              {campaign.amountCollected}
            </div>
            <div className="px-4 py-2 italic bg-zinc-700 flex justify-center items-center text-zinc-400">
              Raised of {campaign.target}
            </div>
          </div>
          <div className="flex flex-col rounded-lg overflow-hidden">
            <div className="p-4 flex-grow font-bold text-2xl bg-zinc-800 flex justify-center items-center">
              {campaign.donators?.length}
            </div>
            <div className="px-4 py-2 italic bg-zinc-700 flex justify-center items-center text-zinc-400">
              Total Donations
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-between flex-col lg:flex-row">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row justify-between gap-8">
              <div className="flex flex-col gap-2">
                <div className="uppercase text-2xl font-bold">Creator</div>
                <div className="flex items-center gap-2">
                  <MdAccountCircle className="text-2xl" />
                  <div className="italic flex gap-1">
                    <span className="text-zinc-500">by</span>{" "}
                    <span className="font-bold">
                      <Copyable string={campaign.owner} position="right" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 md:items-end">
                <div className="uppercase text-2xl font-bold">Deadline</div>
                <div className="flex items-center gap-2">
                  <MdCalendarMonth className="text-2xl" />
                  <div className="font-bold text-zinc-500">
                    {campaign.deadline}
                  </div>
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
          {!address ? (
            <div className="bg-zinc-800 w-full max-w-[30rem] self-center p-4 md:p-8 rounded-lg text-center font-bold text-2xl text-zinc-500">
              To fund this campaign, please connect to your wallet first!
            </div>
          ) : campaign.owner === address ? (
            campaign.isActive ? (
              <div className="bg-zinc-800 w-full max-w-[30rem] self-center p-4 md:p-8 rounded-lg flex flex-col gap-4 items-center">
                <div className="font-bold text-2xl text-zinc-500">
                  End the donation process
                </div>
                <div className="bg-zinc-900 p-4 md:p-8 rounded-lg w-full">
                  <div className="font-bold text-xl text-zinc-400">
                    Congratulations on your efforts.
                  </div>
                  <div className="italic text-zinc-500">
                    You have reached your campaign goal and want to stop the
                    donation process!
                  </div>
                </div>
                <div
                  onClick={() => handleChangeStatus(false)}
                  className={`button delete${isLoading ? " disabled" : ""}`}
                >
                  {isLoading ? (
                    <RiLoader4Line className="animate-spin" />
                  ) : (
                    <MdPowerSettingsNew />
                  )}
                  <div>Disable campaign</div>
                </div>
              </div>
            ) : (
              <div className="bg-zinc-800 w-full max-w-[30rem] self-center p-4 md:p-8 rounded-lg flex flex-col gap-4 items-center">
                <div className="font-bold text-2xl text-zinc-500">
                  Continue the donation process
                </div>
                <div className="bg-zinc-900 p-4 md:p-8 rounded-lg w-full">
                  <div className="font-bold text-xl text-zinc-400">
                    Every effort counts, keep going.
                  </div>
                  <div className="italic text-zinc-500">
                    Don't give up, keep pushing and remember that change takes
                    time!
                  </div>
                </div>
                {campaign.isActive ? (
                  <div
                    onClick={() => handleChangeStatus(false)}
                    className={`button delete${isLoading ? " disabled" : ""}`}
                  >
                    {isLoading ? (
                      <RiLoader4Line className="animate-spin" />
                    ) : (
                      <MdPowerSettingsNew />
                    )}
                    <div>Disable campaign</div>
                  </div>
                ) : (
                  <div
                    onClick={() => handleChangeStatus(true)}
                    className={`button${isLoading ? " disabled" : ""}`}
                  >
                    {isLoading ? (
                      <RiLoader4Line className="animate-spin" />
                    ) : (
                      <MdPowerSettingsNew />
                    )}
                    <div>Active campaign</div>
                  </div>
                )}
              </div>
            )
          ) : campaign.isActive ? (
            <div className="bg-zinc-800 w-full max-w-[30rem] self-center p-4 md:p-8 rounded-lg flex flex-col gap-4 items-center">
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
              <div className="bg-zinc-900 p-4 md:p-8 rounded-lg w-full">
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
                className={`button${
                  amount <= 0 || isLoading ? " disabled" : ""
                }`}
              >
                {isLoading ? (
                  <RiLoader4Line className="animate-spin" />
                ) : (
                  <FaDonate />
                )}
                <div>Fund campaign</div>
              </div>
            </div>
          ) : (
            <div className="bg-zinc-800 w-full max-w-[30rem] self-center p-4 md:p-8 rounded-lg flex flex-col gap-4 items-center">
              <div className="font-bold text-2xl text-zinc-500">
                Disabled campaign
              </div>
              <div className="bg-zinc-900 p-4 md:p-8 rounded-lg w-full">
                <div className="font-bold text-xl text-zinc-400">
                  Donations are no longer being accepted for this campaign.
                </div>
                <div className="italic text-zinc-500">
                  The owner of this campaign has ended the donation process!
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
