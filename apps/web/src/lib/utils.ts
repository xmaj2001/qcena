export { cn } from "cn";
export const formatKz = (value: string) => {
  return new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
  }).format(parseFloat(value));
};