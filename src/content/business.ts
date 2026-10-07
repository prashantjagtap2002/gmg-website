import { img, video } from "./media";

export const businessHeroVideo = video("2026/04/11490-230853032.mp4");

export type Office = { name: string; address: string; image: ReturnType<typeof img>; mapUrl: string };

/** `logoWidth` is the brand logo width as [desktop, mobile], as tuned on the original page. */
export const officeGroups: { title: string; logo: ReturnType<typeof img>; logoWidth: [string, string]; offices: Office[] }[] = [
  {
    title: "Gautam Modi Group Office",
    logo: img("2026/03/GMG-01-2.png"),
    logoWidth: ["7%", "22%"],
    offices: [
      {
        name: "Gautam Modi Group",
        address: "Neo Vikram Building, Andheri Link Rd, Sahakar Nagar, Azad Nagar, Andheri West, Andheri, Mumbai, Maharashtra 400053",
        image: img("2026/02/office.png"),
        mapUrl: "https://maps.app.goo.gl/yMW9r9TNQ1EVLLhS8",
      },
    ],
  },
  {
    title: "TESLA Collision Centre",
    logo: img("2026/08/TESLA_APCC_Wht_Black-1024x355-1.webp"),
    logoWidth: ["18%", "22%"],
    offices: [
      {
        name: "TESLA - Approved Collision Center",
        address: "Bharti Compound, 167, VN Marg, near Audi West Workshop, Kolivery Village, MMRDA Area, Kalina, Santacruz East, Mumbai, Maharashtra 400098",
        image: img("2026/08/WhatsApp-Image-2026-08-11-at-5.11.24-PM.jpeg"),
        mapUrl: "https://maps.app.goo.gl/yCo2aS2P32oxEXXW9",
      },
    ],
  },
  {
    title: "Hyundai Showroom",
    logo: img("2026/03/Untitled-design-24.png"),
    logoWidth: ["18%", "22%"],
    offices: [
      {
        name: "Hyundai Santacruz Showroom",
        address: "Bus Depot, Vikas Center G/02, S.V. Rd, BEST Colony, Santacruz West, Mumbai, Maharashtra 400054",
        image: img("2026/02/Hyundai-Santacruz-scaled.png"),
        mapUrl: "https://maps.app.goo.gl/mgcnAc2cZp2k3kqT7",
      },
      {
        name: "Hyundai Vasai Showroom",
        address: "Prime House Main Rd, Sativali Rd, Opp Shailesh Industries Estate, Waliv Phata, Vasai East, Maharashtra 401208",
        image: img("2026/02/Hyundai-Vasai-Showroom-scaled.png"),
        mapUrl: "https://maps.app.goo.gl/H76vqfmtZLYdtA2m7",
      },
      {
        name: "Hyundai Virar Showroom",
        address: "HDL Residency Park, Shop 1/2 E Wing, Global City, Opp Yazoo Park, Virar West, Mumbai, Maharashtra 401305",
        image: img("2026/02/Hyundai-Virar-Showroom-scaled.png"),
        mapUrl: "https://maps.app.goo.gl/MvZTbLt9LwdiccX39",
      },
      {
        name: "Hyundai Thane Showroom",
        address: "Modi House 1 Eastern Express Highway opp LIC Bldg., Naupada, Louis Wadi, Thane West, Maharashtra 400602",
        image: img("2026/02/Hyundai-Thane-Showroom-scaled.png"),
        mapUrl: "https://maps.app.goo.gl/qTze5SxmASVe8caz9",
      },
      {
        name: "Hyundai H Promise Thane Showroom",
        address: "Wadekar Compound, Modi Hyundai H Promise Showroom, near Viddyapith Bus Stop, Service Rd, Thane West – 400601",
        image: img("2026/03/Untitled-design-30.png"),
        mapUrl: "https://maps.app.goo.gl/tKqg7SdrMaTLRFLA8",
      },
      {
        name: "Hyundai Wada Showroom",
        address: "HDL Residency Park , Shop No. 1/2, E Wing Global City , Opp Yazoo Park Virar, Virar West, Maharashtra 401305",
        image: img("2026/02/Hyundai-Service-and-sales-Wada-scaled.png"),
        mapUrl: "https://maps.app.goo.gl/9xuPyKe9c7982ju46",
      },
    ],
  },
  {
    title: "Hyundai Service Center",
    logo: img("2026/03/Untitled-design-24.png"),
    logoWidth: ["18%", "22%"],
    offices: [
      {
        name: "Hyundai Service Centre Wada",
        address: "HDL Residency Park , Shop No. 1/2, E Wing Global City , Opp Yazoo Park Virar, Virar West, Maharashtra 401305",
        image: img("2026/02/Hyundai-Service-and-sales-Wada-scaled.png"),
        mapUrl: "https://maps.app.goo.gl/9xuPyKe9c7982ju46",
      },
      {
        name: "Hyundai Service Centre Chunabhatti",
        address: "Jogani Industrial Estate, VN Purav Marg, Panchsheel Nagar, Chunabhatti, Sion, Mumbai, Maharashtra 400022",
        image: img("2026/02/Hyundai-Service-Chunnabhatti-scaled.png"),
        mapUrl: "https://maps.app.goo.gl/UgAfdCon67sSm8sk6",
      },
      {
        name: "Hyundai Service Centre Thane",
        address: "Navjeevan Compound, 2, Pokhran Rd, opp. Oswal Park, Subhash Nagar, Majiwada, Thane, Maharashtra 400601",
        image: img("2026/02/Hyundai-Thane-Service-scaled.png"),
        mapUrl: "https://maps.app.goo.gl/9UJpenP94RyM9vCY7",
      },
      {
        name: "Hyundai Service Centre Vasai",
        address: "Gala No 8, Richa Industrial Estate, Sativali Rd, Waliv Phata, Golani Naka, Vasai East, Maharashtra 401208",
        image: img("2026/02/Hyundai-Vasai-Service-scaled.png"),
        mapUrl: "https://maps.app.goo.gl/6NLttpYGeSeXae8WA",
      },
      {
        name: "Hyundai Service Centre Virar",
        address: "Sanjog Industrial Estate, Gala no 18,19, near Ran Pada Ground, Virar West, Virar, Maharashtra 401303",
        image: img("2026/02/Hyundai-Virar-Service-scaled.png"),
        mapUrl: "https://maps.app.goo.gl/7KE9pLERUa3ZJhi88",
      },
      {
        name: "Hyundai Service Centre Thane",
        address: "ICEM Engineering Compound Mohanji, Road, opposite Valencia Park, Raghunath Nagar, Sunderji, Thane, Maharashtra 400604",
        image: img("2026/02/Hyundai-raghunath-nagar-service-scaled.png"),
        mapUrl: "https://maps.app.goo.gl/G8agGG1nP9WHBBFi6",
      },
    ],
  },
  {
    title: "Mahindra Showroom",
    logo: img("2026/04/Mahindra-rise.png"),
    logoWidth: ["23%", "40%"],
    offices: [
      {
        name: "Mahindra - Thane Showroom",
        address: "Survey No 412, Ashar Compound, Rd No 27, Wagle Industrial Estate, Thane West, Maharashtra 400604",
        image: img("2026/02/Mahindra-thane-showoom-scaled.jpeg"),
        mapUrl: "https://maps.app.goo.gl/hV126JsMg6duaCmE9",
      },
      {
        name: "Mahindra - Airoli Showroom",
        address: "Hissa No 1, Akshar Green World, Shop 27A 27B, Gate 242, Thane Belapur Rd, Airoli, Maharashtra 400708",
        image: img("2026/03/mahindra-airoli-showroom.jpeg"),
        mapUrl: "https://maps.app.goo.gl/LgYCDcro2fgQ7zceA",
      },
      {
        name: "Mahindra - Worli Mumbai",
        address: "Unit 48, 69 Atria-The Millennium Mall, Dr Annie Besant Rd, Lotus Colony, Worli, Mumbai MH. 400018",
        image: img("2026/04/Untitled-design-31.png"),
        mapUrl: "https://maps.app.goo.gl/rAW8jjtkcfj6HXZNA",
      },
    ],
  },
  {
    title: "Mahindra Service Center",
    logo: img("2026/04/Mahindra-rise.png"),
    logoWidth: ["23%", "40%"],
    offices: [
      {
        name: "Mahindra - Charkop Service Centre",
        address: "Plot 95/96, Mahatma Gandhi Rd, Hindustan Naka, Charkop Industrial Estate, Kandivali West, Mumbai, Maharashtra 400067",
        image: img("2026/03/charkop-_1_.png-scaled.jpg"),
        mapUrl: "https://maps.app.goo.gl/cgV166Va4iuyVuky7",
      },
      {
        name: "Mahindra - Sewri Service Center",
        address: "Sewree Fort, Best Saparia Sub Station, Sewri - Chembur Rd, BPCL Complex, Sewri, Mumbai, Maharashtra 400015",
        image: img("2026/04/Sewri-workshop-image.png"),
        mapUrl: "https://maps.app.goo.gl/GbXbyiRbsUHrxUr58?g_st=iwb",
      },
      {
        name: "Mahindra - Thane Service Center",
        address: "Survey No 412, Ashar Compound, Rd No 27, Wagle Industrial Estate, Thane West, Maharashtra 400604",
        image: img("2026/08/WhatsApp-Image-2026-08-21-at-10.33.22-AM.jpeg"),
        mapUrl: "https://maps.app.goo.gl/hV126JsMg6duaCmE9",
      },
    ],
  },
  {
    title: "Audi Showroom",
    logo: img("2026/01/Audi-removebg-preview.png"),
    logoWidth: ["8%", "22%"],
    offices: [
      {
        name: "Audi Mumbai West",
        address: "Neo Vikram Building, New Link Rd, Sahakar Nagar, Azad Nagar, Andheri West, Andheri, Mumbai, Maharashtra 400053",
        image: img("2026/02/Audi-Mumbai-West-1-scaled.jpeg"),
        mapUrl: "https://maps.app.goo.gl/pG1XwV4YvP7rqis67",
      },
    ],
  },
  {
    title: "Audi Service Center",
    logo: img("2026/01/Audi-removebg-preview.png"),
    logoWidth: ["8%", "22%"],
    offices: [
      {
        name: "Audi Service Mumbai",
        address: "167, CST Road, Kolivery Village, MMRDA Area, Kalina, Santacruz East, Mumbai, Maharashtra 400098",
        image: img("2026/04/WhatsApp-Image-2026-04-08-at-12.23.52-PM.jpeg"),
        mapUrl: "https://share.google/cctHPmdZsckjpoEtp",
      },
      {
        name: "Audi Service Thane",
        address: "ICEM Engineering Compound, Mohan Kopekar Rd, Raghunath Nagar, Sunderji Road, Thane West, Thane, Maharashtra 400604",
        image: img("2026/04/Untitled-design-33.png"),
        mapUrl: "https://share.google/5AXMoGG3ZPn5TRZKZ",
      },
    ],
  },
  {
    title: "MG Showroom",
    logo: img("2026/03/MG-e1773753942960.png"),
    logoWidth: ["10%", "22%"],
    offices: [
      {
        name: "MG Motor Krishiv Auto Showroom",
        address: "CTS 227, Service Rd JVLR, Western Express Hwy, Opp Balsaheb Thackrey Hospital, Jogeshwari East 400060",
        image: img("2026/02/MG-sales-service-JVLR.png"),
        mapUrl: "https://maps.app.goo.gl/mcRNsmGVach4E3XL8",
      },
      {
        name: "MG Motor Krishiv Auto Showroom",
        address: "G-2 Electric Mansion, Plot 1086, Appasaheb Marathe Marg, Century Bazaar, Prabhadevi, Mumbai 400025",
        image: img("2026/02/MG-Sales-Prabhadevi.png"),
        mapUrl: "https://maps.app.goo.gl/FrXKMPYfkXyjgSEn6",
      },
      {
        name: "MG Motor Krishiv Auto Showroom",
        address: "Shakti Premises, New Link Rd, Near Inorbit Mall, Opp Cloud Nine Hospital, Malad West, Mumbai, Maharashtra 400064",
        image: img("2026/02/MG-Service-Malad.png"),
        mapUrl: "https://maps.app.goo.gl/1JSvYJRi8mvZZ4YVA",
      },
      {
        name: "MG Motor Krishiv Auto Showroom",
        address: "Ground Fl Shop 1-2, Rajprabha Ind Estate, Boidpada, Sativali Rd, Goli Naka, Vasai East 401208",
        image: img("2026/02/MG-Vasai-Showroom.png"),
        mapUrl: "https://maps.app.goo.gl/mUJ3HoXaBciFR9MQ8",
      },
    ],
  },
  {
    title: "MG Service Center",
    logo: img("2026/03/MG-e1773753942960.png"),
    logoWidth: ["10%", "22%"],
    offices: [
      {
        name: "MG Motor Krishiv Auto Service Center",
        address: "301, New Link Rd, Opp Sonal Link Residency, Kandivali, Mithchowki, Malad West, Mumbai, Maharashtra 400064",
        image: img("2026/02/MG-Sales-Malad.png"),
        mapUrl: "https://maps.app.goo.gl/o1PES1Mb1w8z5YuD7",
      },
      {
        name: "MG Motor Krishiv Auto Service Center",
        address: "CTS 227, Service Rd near JVLR, Western Express Hwy, Beside MG Showroom, Jogeshwari East, Mumbai, Maharashtra 400060",
        image: img("2026/02/MG-sales-service-JVLR.png"),
        mapUrl: "https://maps.app.goo.gl/kGLq83fhMDaF2FRM7",
      },
      {
        name: "MG Motor Krishiv Auto Service Center",
        address: "MG South Shree Ram Cotton Pressing Factory Pvt Ltd, 38 Reay Rd, Railway Bridge, Opp Cottongreen, Mumbai, Maharashtra 400033",
        image: img("2026/05/cotton-green-service-center.jpeg"),
        mapUrl: "https://maps.app.goo.gl/4rHEvRgYPB5f7XtB6",
      },
    ],
  },
  {
    title: "MG Select Showroom",
    logo: img("2026/03/MG_SELECT.png"),
    logoWidth: ["20%", "22%"],
    offices: [
      {
        name: "MG Select Mumbai",
        address: "Atur House 87, Dr Annie Besant Rd, Tulsi Vihar, Siddharth Nagar, Worli, Mumbai, Maharashtra 400018",
        image: img("2026/05/MG-select-mumbai.jpeg"),
        mapUrl: "https://maps.app.goo.gl/avWkwRLnZn2ED4Hh8",
      },
    ],
  },
  {
    title: "Kia Showroom",
    logo: img("2026/03/Untitled-design-17.png"),
    logoWidth: ["12%", "22%"],
    offices: [
      {
        name: "Kia Car Showroom Pimpalghar",
        address: "Ground Floor, Kalyan–Bhiwandi Rd, near Mahanagar CNG, Sapna Industrial Estate, Pimpalghar, Bhiwandi, Maharashtra 421302",
        image: img("2026/04/ChatGPT-Image-Apr-4-2026-06_05_04-PM.png"),
        mapUrl: "https://maps.app.goo.gl/JHaayQzMFUHPoNnx8",
      },
      {
        name: "Kia Car Showroom Dombivli",
        address: "B - 1, Parvati Heights, Shop No 02, Ground Floor, Building, Kalyan - Shilphata Rd, Padle, Dombivli, Thane, Maharashtra 421204",
        image: img("2026/02/kia-shilphata.JPG-scaled.jpeg"),
        mapUrl: "https://maps.app.goo.gl/tY53dCfJwGjvt6AW8",
      },
    ],
  },
  {
    title: "Kia Service Center",
    logo: img("2026/03/Untitled-design-17.png"),
    logoWidth: ["12%", "22%"],
    offices: [
      {
        name: "Kia Service Centre Pimpalghar",
        address: "Ground Floor, Kalyan–Bhiwandi Rd, near Mahanagar CNG, Sapna Industrial Estate, Pimpalghar, Bhiwandi, Maharashtra 421302",
        image: img("2026/06/ml.JPG-scaled.jpeg"),
        mapUrl: "https://maps.app.goo.gl/JHaayQzMFUHPoNnx8",
      },
    ],
  },
  {
    title: "ThinKarz Showroom",
    logo: img("2026/03/Thinkarz-2-e1773836400492.png"),
    logoWidth: ["23%", "50%"],
    offices: [
      {
        name: "ThinKarz",
        address: "Dheeraj Sagar, Building, New Link Rd, opp. Goregaon Sports Club, Malad, Ekta Nagar, Malad West, Mumbai, Maharashtra 400064",
        image: img("2026/08/3f3d09a3-5034-479e-a30c-52cb23fdb51e.jpeg"),
        mapUrl: "https://maps.app.goo.gl/C75iaf4evn3V8QTS9",
      },
    ],
  },
  {
    title: "Brain Box Media Office",
    logo: img("2026/03/bbm_logo_white.png"),
    logoWidth: ["15%", "22%"],
    offices: [
      {
        name: "Brain Box Media",
        address: "Basement, besides Couch Potato, Neo Vikram Building, station, near Metro Station D N Nagar, Sahakar Nagar, Azad Nagar, Andheri West, Mumbai, Maharashtra 400053",
        image: img("2026/02/Brain-Box-Media-BBM-office.png"),
        mapUrl: "https://maps.app.goo.gl/Ydc1aKfmVmNQo6mP7",
      },
    ],
  },
  {
    title: "Krishiv Office",
    logo: img("2026/03/Krishvi-e1773836422240.png"),
    logoWidth: ["17%", "22%"],
    offices: [
      {
        name: "Krishiv Insurance Broking LLP - Regional Office",
        address: "6th Floor, Krishiv Insurance Broking LLP, Janki Centre, 610, Veera Desai Rd, Industrial Area, Andheri West, Mumbai, Maharashtra 400053",
        image: img("2026/04/krishiv-office.png"),
        mapUrl: "https://maps.app.goo.gl/Ay1HR3jAfNS5BsMe9",
      },
    ],
  },
];
