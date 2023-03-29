import { useContext } from "react";
import {
  MdAccountCircle,
  MdCalendarMonth,
  MdDeleteForever,
} from "react-icons/md";
import { FaDonate } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { StoreContext } from "../store";
import { getDaysLeft, getPercent } from "../utils";

const CampaignDetails = () => {
  const { id } = useParams();
  const { username, campaigns } = useContext(StoreContext);

  const getIndex = (title) => {
    return campaigns.findIndex((campaign) => campaign.title === title);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4">
        <div className="h-96 relative rounded-t-lg overflow-hidden flex-grow">
          <img
            className="w-full h-full object-cover"
            src={`https://picsum.photos/${
              1000 + getIndex(campaigns[id].title)
            }/${500 + getIndex(campaigns[id].title)}`}
            alt={campaigns[id].title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent top-0 left-0 p-8 flex items-end">
            <div className="font-bold text-5xl">{campaigns[id].title}</div>
          </div>
          <div
            className="percent"
            style={{
              "--value": getPercent(
                campaigns[id].amountCollected,
                campaigns[id].target
              ),
            }}
          ></div>
        </div>
        <div className="flex-shrink-0 grid grid-rows-3 gap-4">
          <div className="flex flex-col rounded-lg overflow-hidden">
            <div className="flex-grow font-bold text-2xl bg-zinc-800 flex justify-center items-center">
              {getDaysLeft(campaigns[id].deadline)}
            </div>
            <div className="px-4 py-2 italic bg-zinc-700 flex justify-center items-center text-zinc-400">
              Days Left
            </div>
          </div>
          <div className="flex flex-col rounded-lg overflow-hidden">
            <div className="flex-grow font-bold text-2xl bg-zinc-800 flex justify-center items-center">
              {campaigns[id].amountCollected}
            </div>
            <div className="px-4 py-2 italic bg-zinc-700 flex justify-center items-center text-zinc-400">
              Raised of {campaigns[id].target}
            </div>
          </div>
          <div className="flex flex-col rounded-lg overflow-hidden">
            <div className="flex-grow font-bold text-2xl bg-zinc-800 flex justify-center items-center">
              {campaigns[id].donators.length}
            </div>
            <div className="px-4 py-2 italic bg-zinc-700 flex justify-center items-center text-zinc-400">
              Total Donators
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-8 justify-between flex-col lg:flex-row">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div className="uppercase text-2xl font-bold flex justify-between">
              <div>Creator</div>
              <div>Deadline</div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <MdAccountCircle className="text-2xl" />
                <div className="truncate italic">
                  <span className="text-zinc-500">by</span>{" "}
                  <span className="font-bold">{campaigns[id].owner}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MdCalendarMonth className="text-2xl" />
                <div className="font-bold text-zinc-500">
                  {campaigns[id].deadline}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="uppercase text-2xl font-bold">Story</div>
            <div className="italic text-zinc-500">{campaigns[id].story}</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="uppercase text-2xl font-bold">Donators</div>
            <div className="italic text-zinc-500 w-full flex flex-col gap-2">
              {campaigns[id].donators.map(({ name, donation }, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    {index + 1}. {name}
                  </div>
                  <div>{donation}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-shrink-0">
          <div className="uppercase text-2xl font-bold">Fund</div>
          {campaigns[id].owner === username ? (
            <div className="bg-zinc-800 w-[30rem] self-center p-8 rounded-lg flex flex-col gap-4 items-center">
              <div className="font-bold text-2xl text-zinc-500">
                End the crowdfunding process
              </div>
              <div className="bg-zinc-900 p-8 rounded-lg">
                <div className="font-bold text-xl text-zinc-400">
                  You have reached your campaign target.
                </div>
                <div className="italic text-zinc-500">
                  End your fundraising, and let's get started!
                </div>
              </div>
              <div className="button delete">
                <MdDeleteForever />
                <div>Delete campaign</div>
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
              />
              <div className="bg-zinc-900 p-8 rounded-lg">
                <div className="font-bold text-xl text-zinc-400">
                  Back it because you believe in it.
                </div>
                <div className="italic text-zinc-500">
                  Support the project for no reward, just because it speaks to
                  you.
                </div>
              </div>
              <div className="button">
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
