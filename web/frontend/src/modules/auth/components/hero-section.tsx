import { IconBadge } from "./icon-badge";
import { ProgressDots } from "./progress-dots";

interface HeroSectionProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  showProgress?: boolean;
}

export const HeroSection = ({
  title,
  description,
  icon,
  showProgress = true,
}: HeroSectionProps) => (
  <div className="text-center space-y-6 max-w-md">
    {icon && <IconBadge icon={icon} size="md" variant="light" />}
    <h2 className="text-3xl lg:text-4xl font-bold text-white">{title}</h2>
    <p className="text-lg text-white/80">{description}</p>
    {showProgress && <ProgressDots count={3} activeIndex={2} color="white" />}
  </div>
);
