import Image from "next/image";
import { siteConfig } from "@/content/site";

const socialIcons = [
  {
    label: "Facebook",
    href: siteConfig.social.facebook,
    viewBox: "0 0 512 512",
    path: "M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z",
  },
  {
    label: "Instagram",
    href: siteConfig.social.instagram,
    viewBox: "0 0 448 512",
    path: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z",
  },
  {
    label: "Linkedin",
    href: siteConfig.social.linkedin,
    viewBox: "0 0 448 512",
    path: "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z",
  },
];

const heading = "text-center text-[25px] leading-none font-semibold text-white";

export default function Footer() {
  return (
    <footer className="bg-footer pt-[50px]">
      <div className="mx-auto grid w-[90%] grid-cols-1 md:min-h-[268px] md:w-[80%] md:grid-cols-3">
        <div className="flex flex-col items-center gap-[25px] pb-[60px] md:pb-0">
          <h2 className={heading}>AWARDS &amp; RECOGNITION</h2>
          <Image src={siteConfig.awardBadge} alt="ET Edge Best Organisations to Work 2026" className="h-auto w-1/2" sizes="(max-width: 767px) 45vw, 192px" />
        </div>

        <div className="flex flex-col items-center gap-[25px] pb-[60px] md:pb-0">
          <h2 className={heading}>CONTACT</h2>
          <p className="text-center leading-6">
            <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
            <br />
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
          <ul className="flex gap-[10px] md:gap-[15px]">
            {socialIcons.map((icon) => (
              <li key={icon.label}>
                <a
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={icon.label}
                  className="bg-social flex size-[36px] items-center justify-center rounded-full transition-opacity hover:opacity-90 md:size-[41px]"
                >
                  <svg viewBox={icon.viewBox} className="size-[18px] fill-white md:size-[23px]" aria-hidden>
                    <path d={icon.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center gap-5 pb-[50px] md:pb-0">
          <h2 className={`${heading} max-md:text-[22px]`}>Address</h2>
          <p className="text-center leading-6">
            {siteConfig.addressLines[0]}
            <br />
            {siteConfig.addressLines[1]}
          </p>
        </div>
      </div>

      <p className="mx-auto w-[90%] py-5 text-center md:w-[80%] text-[14px] leading-none font-light md:text-[18px]">
        © 2026 Gautam Modi Group. All Rights Reserved.
      </p>
    </footer>
  );
}
