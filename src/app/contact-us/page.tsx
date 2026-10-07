import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact US",
  description:
    "Whether you have a question or need assistance, our team is always happy to help and guide you in the right direction.",
};

export default function ContactPage() {
  return (
    <>
      <section className="flex min-h-[30vh] items-center justify-center md:min-h-[45vh]">
        <h1 className="text-center text-[45px] leading-none font-bold text-white md:text-[90px]">Contact Us</h1>
      </section>

      <div className="mx-auto mt-[70px] flex w-full flex-col p-[10px] md:w-[80%] md:flex-row">
        <div className="flex flex-col gap-5 overflow-hidden rounded-[24px] border border-white/10 bg-white/[.03] p-[4%] backdrop-blur-[12px] transition-transform duration-300 hover:-translate-y-1 md:w-1/2 md:p-[2%]">
          <h2 className="text-center text-[30px] leading-none font-semibold text-white md:text-left md:text-[35px]">Connect With Us</h2>
          <p className="text-center text-[14px] leading-[1.4] text-white md:text-left md:text-[16px] md:leading-none">
            Have a question? Fill out the form below and our team will assist you.
          </p>
          <ContactForm />
        </div>

        <div className="flex flex-col justify-center gap-5 p-[4%] text-center md:w-1/2 md:p-[2%] md:text-left">
          <h2 className="text-[28px] leading-none font-semibold text-white md:text-[38px]">
            We are always ready to help you and answer your questions
          </h2>
          <p className="leading-6">
            Whether you have a question or need assistance, our team is always happy to help and guide you in the right direction.
          </p>
          <div className="leading-6">
            <p className="mb-3">
              <strong>Location:</strong>
              <br />
              Neo Vikram Building, Andheri Link Rd, Sahakar Nagar, Azad Nagar,
              <br />
              Andheri West, Andheri, Mumbai, Maharashtra – 400053
            </p>
            <p className="mb-3">
              <strong>Phone:</strong>
              <br />
              <a href="tel:02241531111">{siteConfig.phone}</a>
            </p>
          </div>
        </div>
      </div>

      <div className="pt-[40px]">
        <iframe
          src={siteConfig.mapEmbedUrl}
          title={siteConfig.mapTitle}
          aria-label={siteConfig.mapTitle}
          loading="lazy"
          className="block h-[50vh] w-full rounded-[10px] border-0 md:h-[70vh]"
        />
      </div>
    </>
  );
}
