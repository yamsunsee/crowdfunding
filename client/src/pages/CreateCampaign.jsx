import { useState } from "react";
import { MdCreditScore, MdRocketLaunch } from "react-icons/md";
import { SiCampaignmonitor } from "react-icons/si";
import { RiLoader4Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "../store";
import { Copyable } from "../components";
import { checkValidImage, getDaysLeft } from "../utils";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const { address, createCampaign } = useStore();
  const [form, setForm] = useState({
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });
  const [isLoading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "deadline" && getDaysLeft(value) === 0) {
      toast.error("The deadline should be a date in the future.");
      setForm({ ...form, deadline: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading || !address) return;

    checkValidImage(form.image, async (isValid) => {
      if (isValid) {
        setLoading(true);
        await createCampaign(form);
        setLoading(false);
        navigate("/");
      } else {
        toast.error("Please enter a valid image URL!");
        setForm({ ...form, image: "" });
      }
    });
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
            <label htmlFor="owner">Your Address *</label>
            <div className="address">
              <Copyable string={address} />
            </div>
          </div>
          <div className="input">
            <label htmlFor="title">Campaign Title *</label>
            <input
              required
              name="title"
              id="title"
              type="text"
              placeholder="Write a title"
              value={form.title}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input">
          <label htmlFor="description">Description *</label>
          <textarea
            required
            name="description"
            id="description"
            rows="10"
            placeholder="Write a description of your campaign"
            value={form.description}
            onChange={handleChange}
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
              value={form.target}
              onChange={handleChange}
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
              value={form.deadline}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input">
          <label htmlFor="image">Campaign Image *</label>
          <input
            required
            name="image"
            id="image"
            type="text"
            placeholder="Place image URL of your campaign"
            value={form.image}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !address}
          className={`button w-fit self-center${
            isLoading || !address ? " disabled" : ""
          }`}
        >
          {isLoading ? (
            <RiLoader4Line className="animate-spin" />
          ) : (
            <SiCampaignmonitor />
          )}
          <div>Submit new campaign</div>
        </button>
      </form>
    </div>
  );
};

export default CreateCampaign;
