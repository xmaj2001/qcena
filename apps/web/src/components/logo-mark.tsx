import { cn } from "cn";
import Image from "next/image";

/** Bisno logo, redrawn as vector from the brand file (three bars with rounded corners). */
// export function LogoMark({
//   className,
//   title = "Bisno",
// }: {
//   className?: string;
//   title?: string;
// }) {
//   return (
//     <svg
//       viewBox="0 0 294 451"
//       className={cn("fill-primary", className)}
//       role="img"
//       aria-label={title}
//     >
//       <path d="M0 0H85V351A85 85 0 0 1 0 266Z" />
//       <path d="M104 99A86 86 0 0 1 190 185V451A86 86 0 0 1 104 365Z" />
//       <path d="M208 112A86 86 0 0 1 294 198V266A86 86 0 0 1 208 352Z" />
//     </svg>
//   );
// }
interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  title?: string;
}
export function LogoMark({ className, title = "Logo", ...props }: IconProps) {
  return (
    <Image
      src={"/logo.png"}
      width={170}
      height={170}
      alt={title}
      className={className}
    />
  );
}
