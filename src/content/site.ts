import { img } from "./media";

export const siteConfig = {
  name: "Gautam Modi Group",
  logo: img("2026/01/Untitled-design-32.png"),
  awardBadge: img("2026/01/ChatGPT-Image-Aug-10-2026-03_47_11-PM.png"),
  phone: "022 4153 1111",
  phoneHref: "tel:+912241531111",
  email: "info@gautammodigroup.com",
  addressLines: [
    "Neo Vikram Building, Andheri Link Rd,",
    "Sahakar Nagar, Azad Nagar, Andheri West, Andheri, Mumbai, Maharashtra – 400053",
  ],
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Neo%20Vikram%20Building%2C%20New%20Link%20Rd%2C%20Sahakar%20Nagar%2C%20Azad%20Nagar%2C%20Andheri%20West%2C%20Andheri%2C%20Mumbai%2C%20Maharashtra%20400053&t=m&z=15&output=embed&iwloc=near",
  mapTitle:
    "Neo Vikram Building, New Link Rd, Sahakar Nagar, Azad Nagar, Andheri West, Andheri, Mumbai, Maharashtra 400053",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100067408746351",
    instagram:
      "https://www.instagram.com/gautam.modi.group?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    linkedin: "https://www.linkedin.com/company/gautam-modi-group/?viewAsMember=true",
  },
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Business", href: "/business" },
  { label: "Gallery", href: "/gallery" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact-us" },
]; 

export const chatbot = {
  webhookUrl: "https://n8n.fiaxe.com/webhook/gmgbot",
  title: "Salomi",
  profileImage: img("2026/03/salomi.png"),
  greeting: "Hi! I am Salomi from Gautam Modi Group. How can I help you today?",
};
