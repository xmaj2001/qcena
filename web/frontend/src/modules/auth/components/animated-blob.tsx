interface AnimatedBlobProps {
  color: string;
  position: string;
  delay?: string;
}

export const AnimatedBlob = ({
  color,
  position,
  delay = "",
}: AnimatedBlobProps) => (
  <div
    className={`absolute ${position} w-72 h-72 ${color} rounded-full mix-blend-screen filter blur-xl opacity-70 animate-blob ${delay}`}
  />
);
