import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileContactBar } from "./MobileContactBar";
import { getSiteConfig } from "@/lib/content/load";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const site = getSiteConfig();

  return (
    <>
      <Header
        agentName={site.agent.name}
        brokerageShort={site.brokerage.short_name}
        phone={site.contact.phone}
        phoneDisplay={site.contact.phone_display}
        chineseEnabled={site.languages_config.chinese_enabled}
      />
      <main className="flex-1 pb-16 pt-[72px] lg:pb-0">{children}</main>
      <Footer
        agent={site.agent}
        contact={site.contact}
        brokerage={site.brokerage}
      />
      <MobileContactBar
        phone={site.contact.phone}
        email={site.contact.email}
        wechat={site.contact.wechat}
      />
    </>
  );
}
