"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type ScrollHashLinkProps = ComponentProps<typeof Link>;

export function ScrollHashLink({
  href,
  onClick,
  ...props
}: ScrollHashLinkProps) {
  const pathname = usePathname();
  const hrefStr = typeof href === "string" ? href : (href.pathname ?? "");

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;

    const hashIndex = hrefStr.indexOf("#");
    if (hashIndex === -1) return;

    const path = hrefStr.slice(0, hashIndex) || "/";
    const id = hrefStr.slice(hashIndex + 1);
    if (!id) return;

    if (pathname === path) {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}

export function scrollToHashId(id: string) {
  document.getElementById(id)?.scrollIntoView({ block: "start" });
}
