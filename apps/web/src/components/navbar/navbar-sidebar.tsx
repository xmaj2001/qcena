// "use client";

// import { Home, ShoppingBag, Sparkles } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import type { Dictionary } from "@/i18n/get-dictionary";

// interface NavbarSidebarProps {
//   dictionary: Dictionary["navbar"];
//   lang: string;
//   siteName: string;
// }

// export function NavbarSidebar({
//   dictionary,
//   lang,
//   siteName,
// }: NavbarSidebarProps) {
//   const links = [
//     { href: `/${lang}`, label: dictionary.home, icon: Home },
//     {
//       href: `/${lang}/products`,
//       label: dictionary.allProducts,
//       icon: ShoppingBag,
//     },
//     {
//       href: `/${lang}/products?sort=new`,
//       label: dictionary.filters.newArrivals,
//       icon: Sparkles,
//     },
//     { href: `/${lang}/blogs`, label: dictionary.blogs, icon: Sparkles },
//     { href: `/${lang}/faqs`, label: dictionary.faqs, icon: Home },
//   ];

//   return (
//     <Sidebar
//       className="top-16 h-[calc(100svh-4rem)]"
//       closeLabel={dictionary.close}
//       collapsible="offcanvas"
//       side="left"
//     >
//       <SidebarHeader className="gap-3 border-b px-4 py-5">
//         <Link className="flex items-center gap-2" href={`/${lang}`}>
//           <Image alt="" height={28} src="/logo.png" width={28} />
//           <span className="font-semibold">{siteName}</span>
//         </Link>
//         <p className="text-sm text-muted-foreground">
//           {dictionary.menuDescription}
//         </p>
//       </SidebarHeader>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>{dictionary.primaryNavigation}</SidebarGroupLabel>
//           <SidebarMenu>
//             {links.map(({ href, label, icon: Icon }) => (
//               <SidebarMenuItem key={href}>
//                 <SidebarMenuButton render={<Link href={href} />}>
//                   <Icon />
//                   <span>{label}</span>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             ))}
//           </SidebarMenu>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// }