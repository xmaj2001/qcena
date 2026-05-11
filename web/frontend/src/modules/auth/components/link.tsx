interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const Link = ({ href, children, className = "" }: LinkProps) => (
  <a
    href={href}
    className={`text-primary hover:opacity-80 font-medium transition-opacity duration-300 ${className}`}
  >
    {children}
  </a>
);
