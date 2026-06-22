import clsx from "clsx";
import Image from "next/image";
import Label from "../details/label";

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: "bottom" | "center";
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        "group flex h-full w-full items-center border-accent-500 justify-center overflow-hidden rounded-lg border hover:border-accent hover:border-2 dark:bg-black",
        {
          relative: label,
        },
      )}
    >
      {props.src ? (
        <Image
          className={clsx("relative h-full w-full object-cover", {
            "transition duration-300 ease-in-out group-hover:scale-105":
              isInteractive,
          })}
          {...props}
        />
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  );
}
