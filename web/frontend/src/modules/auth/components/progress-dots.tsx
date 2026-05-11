interface ProgressDotsProps {
  count?: number;
  activeIndex?: number;
  color?: string;
}

export const ProgressDots = ({
  count = 3,
  activeIndex = 2,
  color = "white",
}: ProgressDotsProps) => (
  <div className="flex justify-center gap-2 pt-4">
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index.toString()}
        className={`w-2 h-2 rounded-full bg-${color}/${index <= activeIndex ? 100 - (activeIndex - index) * 20 : 40}`}
      />
    ))}
  </div>
);
