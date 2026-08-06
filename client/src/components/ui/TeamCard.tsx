import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "./Avatar";

export type TeamMember = {
  name: string;
  role: string;
  bio?: string;
  /** Initials shown in the avatar fallback. */
  initials?: string;
  /** Optional social links (rendered below the bio). */
  social?: { label: string; href: string }[];
};

type TeamCardProps = {
  member: TeamMember;
  className?: string;
};

/**
 * Leadership / team grid card. Initials fallback handles the placeholder
 * case where a portrait photo isn't available.
 */
export function TeamCard({ member, className }: TeamCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col items-center rounded-lg border border-dark/10 bg-white p-6 text-center transition-all duration-350 hover:shadow-elevation-md hover:-translate-y-1",
        className,
      )}
    >
      <Avatar className="mb-4 size-20">
        <AvatarFallback size="xl">
          {member.initials ??
            member.name
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <h3 className="font-display text-h4-24 text-dark">{member.name}</h3>
      <p className="text-small-14 text-primary font-medium">{member.role}</p>
      {member.bio && (
        <p className="mt-3 text-small-14 text-dark-600 text-pretty">
          {member.bio}
        </p>
      )}
      {member.social && member.social.length > 0 && (
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {member.social.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 min-w-[44px] items-center justify-center rounded-md px-3 text-small-14 text-dark-500 transition-colors hover:bg-dark/5 hover:text-dark"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
