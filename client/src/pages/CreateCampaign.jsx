import { MdCreditScore, MdRocketLaunch } from "react-icons/md";
import { SiCampaignmonitor } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const CreateCampaign = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-8 bg-zinc-800 rounded-lg p-8">
      <div className="self-center text-zinc-400 flex gap-2 text-4xl font-bold items-center">
        <div>Start a campaign</div>
        <MdRocketLaunch />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="input">
            <label htmlFor="owner">Your Name *</label>
            <input
              required
              name="owner"
              id="owner"
              type="text"
              placeholder="Write your name"
            />
          </div>
          <div className="input">
            <label htmlFor="title">Campaign Title *</label>
            <input
              required
              name="title"
              id="title"
              type="text"
              placeholder="Write your name"
            />
          </div>
        </div>
        <div className="input">
          <label htmlFor="story">Story *</label>
          <textarea
            required
            name="story"
            id="story"
            rows="10"
            placeholder="Write your story"
          />
        </div>
        <div className="bg-zinc-900 p-8 rounded-lg flex gap-2 text-2xl items-center justify-center">
          <MdCreditScore className="text-zinc-400 text-4xl" />
          <div className="font-bold text-zinc-400">
            You will get 100% of the raised amount
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="input">
            <label htmlFor="target">Goal *</label>
            <input
              required
              name="target"
              id="target"
              type="number"
              min="0"
              step="0.1"
              placeholder="ETH 0.5"
            />
          </div>
          <div className="input">
            <label htmlFor="deadline">End Date *</label>
            <input
              required
              name="deadline"
              id="deadline"
              type="date"
              className="picker"
            />
          </div>
        </div>
        <div className="input">
          <label htmlFor="image">Campaign image *</label>
          <input
            required
            name="image"
            id="image"
            type="text"
            placeholder="Place image URL of your campaign"
          />
        </div>
        <button type="submit" className="button w-fit self-center">
          <SiCampaignmonitor />
          <div>Submit new campaign</div>
        </button>
      </form>
    </div>
  );
};

export default CreateCampaign;
