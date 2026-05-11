import { AnimatedBlob } from "./animated-blob";

interface GradientBackgroundProps {
  children: React.ReactNode;
  variant?: "default" | "dark" | "light";
}

export const GradientBackground = ({
  children,
  variant = "dark",
}: GradientBackgroundProps) => {
  const variants = {
    default: "bg-gradient-to-br from-background to-secondary",
    dark: "bg-gradient-to-br from-accent/90 via-accent-foreground/30 to-accent/90",
    light: "bg-gradient-to-br from-white via-primary/50 to-primary/90",
  };

  return (
    <div
      className={`hidden lg:flex flex-1 relative overflow-hidden rounded-2xl h-[95vh] m-auto mr-8`}
    >
      <div className={`absolute inset-0 ${variants[variant]}`} />
      <div className="absolute inset-0">
        <AnimatedBlob color="bg-accent/30" position="top-0 -left-4" />
        <AnimatedBlob
          color="bg-accent-foreground/30"
          position="top-0 -right-4"
          delay="animation-delay-2000"
        />
        <AnimatedBlob
          color="bg-accent/30"
          position="-bottom-8 left-20"
          delay="animation-delay-4000"
        />
      </div>

      {/* <Image
        src="/images/background1.jpg"
        alt="Premium background"
        fill
        className="object-cover scale-105"
        priority
      /> */}
      {/* <GradientWave /> */}

      <div className="relative z-10 flex items-center justify-center p-8 lg:p-12 w-full">
        {children}
      </div>
    </div>
  );
};
