import { Link } from "./link";

interface FormFooterProps {
  text: string;
  linkText: string;
  linkHref: string;
}

export const FormFooter = ({ text, linkText, linkHref }: FormFooterProps) => (
  <p className="mt-6 text-center text-sm text-muted-foreground">
    {text} <Link href={linkHref}>{linkText}</Link>
  </p>
);
