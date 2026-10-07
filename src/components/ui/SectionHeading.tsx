type Props = {
  children: React.ReactNode;
  className?: string;
};

/** Centered 55px section title used across the site (pass a max-md: size to override on phones). */
export default function SectionHeading({ children, className = "max-md:text-[35px]" }: Props) {
  return <h2 className={`text-center text-[55px] leading-none font-bold text-white ${className}`}>{children}</h2>;
}
