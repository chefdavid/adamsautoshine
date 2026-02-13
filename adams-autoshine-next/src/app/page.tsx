import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { Pricing } from "@/components/sections/Pricing";
import { Gallery } from "@/components/sections/Gallery";
import { About } from "@/components/sections/About";
import { CTABanner } from "@/components/sections/CTABanner";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Booking } from "@/components/sections/Booking";
import { getAllContent } from "@/lib/content";
import { getDefaults } from "@/lib/defaults";
import type {
  HeroData,
  ServiceData,
  WhyReasonData,
  StatData,
  PricingTierData,
  GalleryItemData,
  PerkData,
  TestimonialData,
  FAQData,
  ContactData,
  AboutData,
  CTABannerData,
} from "@/lib/admin-types";

export const revalidate = 60;

export default async function Home() {
  const content = await getAllContent();

  const hero = (content.hero || getDefaults("hero")) as HeroData;
  const servicesData = (content.services || getDefaults("services")) as ServiceData[];
  const whyReasons = (content["why-us"] || getDefaults("why-us")) as WhyReasonData[];
  const stats = (content.stats || getDefaults("stats")) as StatData[];
  const pricing = (content.pricing || getDefaults("pricing")) as PricingTierData[];
  const gallery = (content.gallery || getDefaults("gallery")) as GalleryItemData[];
  const bookingPerks = (content["booking-perks"] || getDefaults("booking-perks")) as PerkData[];
  const testimonials = (content.testimonials || getDefaults("testimonials")) as TestimonialData[];
  const faqs = (content.faqs || getDefaults("faqs")) as FAQData[];
  const contact = (content.contact || getDefaults("contact")) as ContactData;
  const about = (content.about || getDefaults("about")) as AboutData;
  const ctaBanner = (content["cta-banner"] || getDefaults("cta-banner")) as CTABannerData;
  const serviceOptions = content["service-options"] || getDefaults("service-options");

  return (
    <main>
      <Hero data={hero} />
      <Services data={servicesData} />
      <WhyUs reasons={whyReasons} stats={stats} />
      <Pricing data={pricing} />
      <Gallery data={gallery} />
      <Booking
        perks={bookingPerks}
        serviceOptions={(serviceOptions as { services: { value: string; label: string }[]; times: { value: string; label: string }[] }).services}
        timeOptions={(serviceOptions as { services: { value: string; label: string }[]; times: { value: string; label: string }[] }).times}
      />
      <Testimonials data={testimonials} googleUrl={contact.social?.google} />
      <FAQ data={faqs} />
      <About data={about} />
      <Contact data={contact} />
      <CTABanner data={ctaBanner} phoneHref={contact.phoneHref} />
    </main>
  );
}
