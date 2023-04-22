"use client";

import { usePathname } from "next/navigation";

import { HeaderView } from "./HeaderView";

const links = [
  { title: "Расписание", href: "/schedule" },
  { title: "Станции", href: "/stations", line: "" },
];

export const HeaderContainer = () => {
  const pathname = usePathname();

  return <HeaderView links={links} active={pathname} />;
};
