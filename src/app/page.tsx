import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingNav } from "@/components/landing/landing-nav";
import { PlatformShowcase } from "@/components/landing/platform-showcase";
import { RoleCtas } from "@/components/landing/role-ctas";
import { TrustStats } from "@/components/landing/trust-stats";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <LandingNav />
      <main className="flex flex-1 flex-col">
        <Hero />
        <TrustStats />
        <HowItWorks />
        <PlatformShowcase />
        <RoleCtas />
      </main>
      <LandingFooter />
    </div>
  );
}
