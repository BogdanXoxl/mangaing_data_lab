import Link from "next/link";

import { Container } from "../Container";

type Props = {
  links: {
    href: string;
    title: string;
  }[];
  active?: string;
};

export const HeaderView = ({ links, active }: Props) => {
  return (
    <header className="w-full bg-primary  text-secondary">
      <Container className="flex items-center gap-x-5 sm:justify-start">
        <Link href="/" className="text-2xl font-bold text-default md:pr-16">
          HOME
        </Link>
        {links.map((el) => (
          <Link
            key={el.href}
            href={el.href}
            className={`py-5 underline-offset-8 hover:underline ${
              active?.includes(el.href) && "underline"
            }`}
          >
            {el.title}
          </Link>
        ))}
      </Container>
    </header>
  );
};
