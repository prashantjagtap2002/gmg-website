import { img, video } from "./media";

export type CardVariant = "blue" | "red" | "orange" | "purple";

/** Full-screen hero slider. The Kia film is trimmed to the 10s the slide loops. */
export const heroVideos = [
  video("2026/01/The_all-new_Kia_Seltos_l_Unveiling_Film_1080P.mp4"),
  video("2026/01/IMG_4681.mp4"),
  video("2026/01/IMG_4684.mp4"),
  video("2026/02/Untitled-design-1.mp4"),
  video("2026/01/IMG_4683.mp4"),
  video("2026/01/IMG_4686.mp4"),
  video("2026/01/Mahindra_XUV_7XO_AX7_Luxury_1080P-1.mp4"),
];

export const coreValues: { title: string; text: string; variant: CardVariant }[] = [
  {
    title: "Exploring New Horizons",
    text: "We embrace new opportunities that inspire growth, innovation, and progress.",
    variant: "blue",
  },
  {
    title: "Nurturing Talents",
    text: "We value, empower, and develop our people to drive excellence.",
    variant: "red",
  },
  {
    title: "Process with Tenacity",
    text: "Strong processes turn strategy into consistent, effective action.",
    variant: "orange",
  },
  {
    title: "Grandiose Experience",
    text: "We create meaningful experiences through recognition, care, and service.",
    variant: "purple",
  },
];

export const strengths: { title: string; text: string; variant: CardVariant }[] = [
  {
    title: "Customer-Centricity",
    text: "At the heart of our success lies a deep commitment to our customers, strengthened by a process-oriented approach that ensures efficiency, precision and quality at every level. Through well-defined systems and a culture of continuous improvement, we strive to deliver seamless experiences that not only meet but exceed customer expectations, building trust with every interaction.",
    variant: "blue",
  },
  {
    title: "Core Competencies",
    text: "Our people are the cornerstone of our progress. Over the past decades, we have grown from a 100-member team to a strong workforce of over 3,500 passionate professionals. This growth reflects our belief in nurturing talent, fostering collaboration and creating an environment where innovation and commitment thrive together.",
    variant: "red",
  },
  {
    title: "Industry Recognitions",
    text: "Our journey has been marked with milestones of excellence and moments of pride. Over the decades, our pursuit of quality, innovation and integrity has earned us recognition across the industry. Each award we receive is not just an achievement; it’s a reminder of the trust our customers place in us and the high standards we continue to uphold.",
    variant: "orange",
  },
  {
    title: "Growth Momentum",
    text: "Our accelerating growth reflects both market leadership and enduring customer trust. With monthly sales rising from over 500 to more than 1500 units per month, we continue to strengthen our position as a leading force. This momentum tells the story of our ambition to reach new horizons, deliver unmatched value and set new benchmarks of excellence across our brands.",
    variant: "purple",
  },
];

const logos = {
  kia: img("2026/03/GC-Automobile-1200-x-400-px-1.png"),
  audi: img("2026/03/GC-Automobile-1200-x-400-px-6.png"),
  mahindra: img("2026/04/Mahindra-rise.png"),
  krishiv: img("2026/03/Krishvi-e1773836422240.png"),
  mgSelect: img("2026/03/MG_SELECT.png"),
  thinkarz: img("2026/03/Thinkarz-2-e1773836400492.png"),
  hyundai: img("2026/03/Untitled-design-24.png"),
};

/**
 * `logoWidth` is the logo's width within the card header row as
 * [desktop, mobile] CSS lengths — tuned per logo on the original site.
 */
export const testimonials = [
  {
    name: "Sujo Joseph",
    logo: logos.kia,
    logoWidth: ["22.5%", "22.5%"],
    text: "Had a wonderful experience at KIA Modi Showroom, Shilphata! The entire team was extremely professional, friendly, and helpful throughout the process. They patiently explained all the features and made the delivery process smooth and memorable. Special thanks to Ms Sabina Qureshi for going the extra mile to ensure everything was perfect. Highly recommended for anyone looking to buy a Kia car!",
  },
  {
    name: "Siddhesh Mule",
    logo: logos.mahindra,
    logoWidth: ["31.5%", "40%"],
    text: "I had a very good experience from booking till delivery of the car. Mr. Ajay from sales team is very professional & has such a great knowledge about the car. Overall all staff is very helpful.",
  },
  {
    name: "Manish Vishwakarma",
    logo: logos.krishiv,
    logoWidth: ["25.5%", "35%"],
    text: "I received excellent service from my agent. They made the process seamless and secured a fantastic deal on my car insurance. I highly recommend their services to anyone looking for quality coverage at a great price.",
  },
  {
    name: "Ankur Bhatia",
    logo: logos.mahindra,
    logoWidth: ["31.5%", "40%"],
    text: "The experience at Modi Mahindra was smooth and fantastic. Mr. Sunit Pabrekar assisted from the booking till the delivery process in a very professional manner. Would highly recommend to book your next mahindra from Modi Mahindra Airoli.",
  },
  {
    name: "Santosh Dhadve",
    logo: logos.mgSelect,
    logoWidth: ["27%", "34%"],
    text: "We took the delivery of Our M9 car in the name Kyrush Ventures LLp, it was an amazing experience. Mr. Fazil supported us throughout the process and gave the best service of all the time. The delivery ceremony experience was also amazing thank you so much",
  },
  {
    name: "Hirav Mehta",
    logo: logos.thinkarz,
    logoWidth: ["25.5%", "29.75%"],
    text: "One of the best car dealers in Mumbai, they gave me the best service. They are all very genuine people. I really enjoyed my car delivery Celebration with them! Big thumbs up for Thinkarz and its people.",
  },
  {
    name: "Abhishek Jaiswar",
    logo: logos.mahindra,
    logoWidth: ["31.5%", "40%"],
    text: "Experienced a family friendly behaviour by staff personally by Moin Khan- Sales Executive, Booked Purchased Scorpio N & Enjoying the Ride…. Thank you Mahindra Modi… Hope such experience in future too.",
  },
  {
    name: "Prashant Praharaj",
    logo: logos.audi,
    logoWidth: ["20%", "80px"],
    text: "We are extremely happy with the service provided by Imtiyaz and team. Pre booking effort taken by the Mr.Jitendra and team is praise worthy.",
  },
  {
    name: "Ishika Singh",
    logo: logos.mgSelect,
    logoWidth: ["27%", "34%"],
    text: "Wonderful experience here. Felt truly amazing getting my dream car in such a welcoming way. We were provided with so much comfort and goodies here. Amazing hospitality!",
  },
  {
    name: "Varun Agarwal",
    logo: logos.hyundai,
    logoWidth: ["18.6%", "30%"],
    text: "We have recently purchased an Alcazar. The entire process was made extremely smooth by Ms. Payal. Right from booking to delivery, we were well guided and all our requests and queries were taken care of well. We are very thankful to her and the entire Modi Hyundai team for that.",
  },
  {
    name: "Krish Salvi",
    logo: logos.audi,
    logoWidth: ["20%", "80px"],
    text: "Had a good experience dealing with Audi Mumbai west. Thank you ashif bhai for making it a special memory for us. I would personally recommend this dealership for good deal and good customer service.",
  },
  {
    name: "Mayuresh Parab",
    logo: logos.mgSelect,
    logoWidth: ["24%", "22%"],
    text: "Had a very good experience starting from booking to delivery. All staff including my relationship manager Sanjeev Kumar is very polite and got prompt responses for every query. Including very fast availability and car delivery.",
  },
  {
    name: "Saurabh Tikiya",
    logo: logos.audi,
    logoWidth: ["20%", "80px"],
    text: "I’ve had a wonderful experience buying my car from them. They’ve been very helpful in making up my mind to buy the car. The sales executive has taken a lot of effort in explaining each and every feature in detail. Mr Imtiyaz, Mr Ashif and Mr Jitendra have ben very nice and courteous to deal with. Overall, I’ve had a great experience.",
  },
  {
    name: "Sumukh Dave",
    logo: logos.mgSelect,
    logoWidth: ["24%", "22%"],
    text: "If you are in the market to buy a new vehicle, this showroom is a must visit place for you.It has the best of Technology & Comfort.The people here are so welcoming, you feel like home. Kudos to the team to keep such nice atmosphere in the showroom !!",
  },
] satisfies { name: string; logo: ReturnType<typeof img>; logoWidth: [string, string]; text: string }[];

export const faqs = [
  {
    question: "What is Gautam Modi Group?",
    answer:
      "Gautam Modi Group is an automotive-focused business group representing leading brands while providing complete end-to-end mobility solutions .",
  },
  {
    question: "What brands are part of Gautam modi Group?",
    answer:
      "Gautam Modi Group represents leading automobile brands including Audi, Mahindra, Hyundai, Kia and MG while also expanding its footprint through Krishiv Insurance and its premium pre-owned car brand ThinkKarz delivering comprehensive automotive and insurance solutions under one trusted group.",
  },
  {
    question: "Is Gautam Modi Group open to Marketing Collaboration?",
    answer:
      "The Gautam Modi Group believes in the power of meaningful partnerships and is always open to marketing collaborations that create mutual value and long-term impact.",
  },
  {
    question: "How can i get in touch with Gautam Modi Group for business inqueries?",
    answer:
      "For business inquiries, you may contact the Gautam Modi Group through the “Contact Us” section on the website.",
  },
  {
    question: "How does Gautam Modi Group offers career opportunities?",
    answer:
      "Gautam Modi Group offers career opportunities through its official website, as well as platforms like LinkedIn and Internshala, where current openings are regularly posted.",
  },
  {
    question: "Does Gautam Modi Group engage in social responsibility initiatives?",
    answer:
      "Gautam Modi Group actively engages in social responsibility initiatives that support community development, welfare and sustainable impact.",
  },
  {
    question: "How can potential investors or partners engage with Gautam Modi Group?",
    answer:
      "Potential investors or partners can engage with the Gautam Modi Group by reaching out through the Contact Us form on the group’s official website or by connecting via the group’s official LinkedIn page .",
  },
  {
    question: "Does Gautam Modi Group has a national and international presence?",
    answer:
      "Gautam Modi Group has a national presence across India through its automotive brand associations and business operations. While its core operations are focused within the country, the group’s partnerships with global automobile brands and strategic networks support an international outlook in terms of brand reach and business engagement.",
  },
];
