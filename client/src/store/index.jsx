import { createContext, useContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { CONTRACT_ADDRESS } from "../constants";

const StoreContext = createContext();
const useStore = () => useContext(StoreContext);

const Store = ({ children }) => {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );
  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address,
        form.title,
        form.description,
        form.image,
        ethers.utils.parseUnits(form.target, 18),
        new Date(form.deadline).getTime(),
      ]);
      toast.success("Your campaign has been created successfully!");
    } catch (error) {
      toast.error("Unfortunately, your campaign could not be created!");
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");
    const parsedCampaigns = campaigns.map((campaign, index) => ({
      id: index,
      owner: campaign.owner,
      title: campaign.title,
      image: campaign.image,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected),
      deadline: new Date(campaign.deadline.toNumber()).toDateString(),
      donators: campaign.donators,
      donations: campaign.donations.map((donation) =>
        ethers.utils.formatEther(donation)
      ),
    }));
    return parsedCampaigns;
  };

  const getCampaign = async (id) => {
    const campaign = await contract.call("getCampaign", id);
    const parsedCampaign = {
      id,
      owner: campaign.owner,
      title: campaign.title,
      image: campaign.image,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected),
      deadline: new Date(campaign.deadline.toNumber()).toDateString(),
      donators: campaign.donators,
      donations: campaign.donations.map((donation) =>
        ethers.utils.formatEther(donation)
      ),
    };
    return parsedCampaign;
  };

  const donateToCampaign = async (id, amount) => {
    try {
      const data = await contract.call("donateToCampaign", id, {
        value: ethers.utils.parseUnits(amount, 18),
      });
      toast.success("Your donation has been successfully processed!");
      return true;
    } catch (error) {
      toast.error("Unfortunately, your donation was unsuccessful!");
      return false;
    }
  };

  return (
    <StoreContext.Provider
      value={{
        contract,
        address,
        connect,
        createCampaign: publishCampaign,
        getCampaign,
        getCampaigns,
        donateToCampaign,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { useStore };
export default Store;
