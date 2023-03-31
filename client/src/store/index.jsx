import { createContext, useContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { toast } from "react-toastify";

const StoreContext = createContext();
const useStore = () => useContext(StoreContext);

const Store = ({ children }) => {
  const { contract } = useContract(
    "0x920bE130B50Dc729e778C8b4DcFE5A94D733AbF6"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );
  const { mutateAsync: removeCampaign } = useContractWrite(
    contract,
    "removeCampaign"
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
      toast.success("Contract call success!");
    } catch (error) {
      toast.error("Contract call failure!");
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");
    const parsedCampaign = campaigns.map((campaign, index) => ({
      id: index,
      owner: campaign.owner,
      title: campaign.title,
      image: campaign.image,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected),
      deadline: new Date(campaign.deadline.toNumber()).toDateString(),
      donators: campaign.donators,
      donations: campaign.donations,
    }));
    return parsedCampaign;
  };

  return (
    <StoreContext.Provider
      value={{
        contract,
        address,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { useStore };
export default Store;
