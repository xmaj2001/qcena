interface IconBadgeProps {
  icon: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
}

export const IconBadge = ({
  icon,
  size = "md",
  variant = "light",
}: IconBadgeProps) => {
  const sizes = {
    sm: "p-2",
    md: "p-3",
    lg: "p-4",
  };

  const variants = {
    light: "bg-white/10 backdrop-blur-sm text-white",
    dark: "bg-black/10 backdrop-blur-sm text-foreground",
  };

  return (
    <div
      className={`inline-flex rounded-full ${sizes[size]} ${variants[variant]} mb-4`}
    >
      {icon}
    </div>
  );
};
