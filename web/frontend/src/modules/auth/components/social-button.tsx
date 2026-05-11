import { GoogleIcon } from "./google-icon";
import { Button } from "./button";

interface SocialButtonProps {
  provider: "google" | "github" | "facebook";
  onClick: () => void;
  children: React.ReactNode;
}

export const SocialButton = ({
  provider,
  onClick,
  children,
}: SocialButtonProps) => {
  const icons = {
    google: <GoogleIcon className="h-5 w-5" />,
    github: null, // Add GitHub icon if needed
    facebook: null, // Add Facebook icon if needed
  };

  return (
    <Button variant="outline" onClick={onClick} fullWidth>
      {icons[provider]}
      {children}
    </Button>
  );
};
