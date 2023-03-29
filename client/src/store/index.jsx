import { createContext } from "react";

const initialValues = {
  username: "Green Earth Foundation",
  isConnected: false,
  campaigns: [
    {
      title: "Clean Water for All",
      story:
        "Many communities around the world still lack access to clean and safe water. Our goal is to raise funds to build and maintain water wells in these communities.",
      deadline: "2023-03-31",
      target: 2000,
      amountCollected: 1750,
      owner: "Water for All Foundation",
      image: "https://picsum.photos/1920/1080",
      donators: [
        { name: "John Doe", donation: 500 },
        { name: "Jane Smith", donation: 1000 },
        { name: "Bob Johnson", donation: 250 },
      ],
    },
    {
      title: "Supporting Local Farmers",
      story:
        "Small-scale farmers often struggle to make a living due to low prices and unfair competition. We want to help by providing them with better equipment and marketing support.",
      deadline: "2023-10-31",
      target: 50000,
      amountCollected: 2500,
      owner: "Farmers' Association",
      image: "https://picsum.photos/1920/1080",
      donators: [
        { name: "Alice Lee", donation: 1000 },
        { name: "Tom Brown", donation: 500 },
        { name: "Sara Jones", donation: 1000 },
      ],
    },
    {
      title: "Protecting Endangered Species",
      story:
        "Many species around the world are facing extinction due to habitat loss and poaching. Our organization works to protect and restore these species and their habitats.",
      deadline: "2023-11-30",
      target: 75000,
      amountCollected: 3000,
      owner: "Endangered Species Alliance",
      image: "https://picsum.photos/1920/1080",
      donators: [
        { name: "Max Chen", donation: 1000 },
        { name: "Eva Kim", donation: 500 },
        { name: "David Wang", donation: 1500 },
      ],
    },
    {
      title: "Helping Homeless Youth",
      story:
        "Many young people are forced to live on the streets due to family problems, poverty, or other challenges. Our program provides them with shelter, food, and support services.",
      deadline: "2023-09-30",
      target: 25000,
      amountCollected: 1750,
      owner: "Youth Outreach",
      image: "https://picsum.photos/1920/1080",
      donators: [
        { name: "Emily Davis", donation: 1000 },
        { name: "Mark Hernandez", donation: 500 },
        { name: "Sophie Nguyen", donation: 250 },
      ],
    },
    {
      title: "Improving Public Education",
      story:
        "Many schools lack the resources and funding needed to provide a quality education for all students. We aim to address this issue by advocating for policy changes and supporting teachers and students.",
      deadline: "2023-12-31",
      target: 100000,
      amountCollected: 2500,
      owner: "Education for All",
      image: "https://picsum.photos/1920/1080",
      donators: [
        { name: "Michael Smith", donation: 1000 },
        { name: "Karen Johnson", donation: 1000 },
        { name: "Kevin Lee", donation: 500 },
      ],
    },
    {
      title: "Feeding Families in Need",
      story:
        "Many families struggle to put food on the table due to poverty or job loss. Our program provides nutritious meals to those in need, and helps them access other support services.",
      deadline: "2023-11-30",
      target: 50000,
      amountCollected: 7500,
      owner: "Food for Families",
      image: "https://picsum.photos/1920/1080",
      donators: [
        { name: "Anna Chen", donation: 1000 },
        { name: "Chris Lee", donation: 5000 },
        { name: "Linda Kim", donation: 1500 },
      ],
    },
    {
      title: "Supporting Mental Health",
      story:
        "Mental health is an often overlooked aspect of overall health and well-being. Our program aims to provide access to mental health resources and support for those who need it most.",
      deadline: "2023-12-31",
      target: 75000,
      amountCollected: 5000,
      owner: "Mental Health Alliance",
      image: "https://picsum.photos/1920/1080",
      donators: [
        { name: "Steven Chang", donation: 2000 },
        { name: "Amy Park", donation: 1000 },
        { name: "Oliver Wu", donation: 2000 },
      ],
    },
    {
      title: "Empowering Women and Girls",
      story:
        "Women and girls often face discrimination and unequal access to education and resources. Our program seeks to empower them through education, leadership training, and advocacy.",
      deadline: "2023-10-31",
      target: 50000,
      amountCollected: 15000,
      owner: "Women's Empowerment Foundation",
      image: "https://picsum.photos/1920/1080",
      donators: [
        { name: "Grace Kim", donation: 5000 },
        { name: "Daniel Lee", donation: 10000 },
        { name: "Emma Davis", donation: 500 },
      ],
    },
    {
      title: "Combatting Climate Change",
      story:
        "Climate change is one of the biggest threats facing our planet today. Our organization works to reduce greenhouse gas emissions, promote renewable energy, and advocate for climate-friendly policies.",
      deadline: "2023-12-31",
      target: 100000,
      amountCollected: 5000,
      owner: "Green Earth Foundation",
      image: "https://picsum.photos/1920/1080",
      donators: [
        { name: "Ryan Chen", donation: 1000 },
        { name: "Julia Park", donation: 2500 },
        { name: "Michael Nguyen", donation: 500 },
      ],
    },
    {
      title: "Providing Disaster Relief",
      story:
        "Natural disasters such as earthquakes, hurricanes, and wildfires can cause immense damage and suffering. Our organization provides emergency relief and long-term support to affected communities.",
      deadline: "2023-11-30",
      target: 75000,
      amountCollected: 10000,
      owner: "Disaster Relief Fund",
      image: "https://picsum.photos/1920/1080",
      donators: [
        { name: "Sophia Lee", donation: 5000 },
        { name: "James Kim", donation: 2000 },
        { name: "Ava Nguyen", donation: 3000 },
      ],
    },
    {
      title: "Planting Trees for the Future",
      story:
        "Deforestation and climate change are major environmental challenges that threaten our planet's future. Our campaign aims to plant trees in deforested areas to combat climate change and protect biodiversity.",
      deadline: "2024-04-30",
      target: 50000,
      amountCollected: 1000,
      owner: "Green Earth Foundation",
      image: "https://picsum.photos/1920/1080",
      donators: [
        { name: "Sarah Brown", donation: 500 },
        { name: "Jack Wilson", donation: 250 },
        { name: "Lena Kim", donation: 250 },
      ],
    },
    {
      title: "Providing Medical Care to Vulnerable Communities",
      story:
        "Many communities around the world lack access to basic healthcare services, which can lead to preventable illnesses and deaths. Our campaign aims to provide medical care to these communities by building clinics and providing supplies and training to healthcare workers.",
      deadline: "2024-02-28",
      target: 75000,
      amountCollected: 5000,
      owner: "Healthcare for All",
      image: "https://picsum.photos/1920/1080",
      donators: [
        { name: "Alex Davis", donation: 1000 },
        { name: "Julia Patel", donation: 2500 },
        { name: "Robert Lee", donation: 1500 },
      ],
    },
  ],
};

const StoreContext = createContext();

const Store = ({ children }) => {
  return (
    <StoreContext.Provider value={initialValues}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext };
export default Store;
