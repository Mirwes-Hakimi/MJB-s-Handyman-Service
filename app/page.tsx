// SERVER COMPONENT: thin page file; just composes the three home sections
import Hero from "@/components/home/Hero";
import ServicesOverview from "@/components/home/ServicesOverview";
import ServiceArea from "@/components/home/ServiceArea";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <ServiceArea />
    </>
  );
}
