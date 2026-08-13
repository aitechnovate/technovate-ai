import * as React from "react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { announcementBar } from "@/data/nav";

/**
 * Default marketing layout — wraps every page in:
 *   <AnnouncementBar /> + <Header /> + <main>{children}</main> + <Footer />
 *   + the floating <ChatWidget />
 *
 * The route group `(marketing)` exists so utility pages (404, etc.) can opt
 * out of this chrome if needed — which also keeps the chatbot off them.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar
        text={announcementBar.text}
        cta={{ label: announcementBar.ctaLabel, href: announcementBar.ctaHref }}
        variant="gradient"
      />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}