"use client";

import dynamic from "next/dynamic";

// Dynamically import block components for code splitting
const Hero = dynamic(() => import("@/components/Hero"), { ssr: true });
const Services = dynamic(() => import("@/components/Services"), { ssr: true });
const Portfolio = dynamic(() => import("@/components/Portfolio"), { ssr: true });
const About = dynamic(() => import("@/components/About"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: true });
const ContentSection = dynamic(() => import("@/components/blocks/ContentSection"), { ssr: true });
const CTASection = dynamic(() => import("@/components/blocks/CTASection"), { ssr: true });

interface BlockData {
  id?: string;
  blockType: string;
  [key: string]: unknown;
}

interface BlockRendererProps {
  blocks: BlockData[];
  services?: unknown[];
  projects?: unknown[];
  testimonials?: unknown[];
}

export default function BlockRenderer({ blocks, services, projects, testimonials }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, index) => {
        const key = block.id || `block-${index}`;

        switch (block.blockType) {
          case "hero":
            return (
              <Hero
                key={key}
                id={block.anchorId as string}
                badge={block.badge as string}
                headline={block.headline as string}
                highlightedText={block.highlightedText as string}
                description={block.description as string}
                primaryButtonText={(block.primaryButton as Record<string, string>)?.text}
                primaryButtonLink={(block.primaryButton as Record<string, string>)?.link}
                secondaryButtonText={(block.secondaryButton as Record<string, string>)?.text}
                secondaryButtonLink={(block.secondaryButton as Record<string, string>)?.link}
                stats={block.stats as Array<{ value: string; label: string }>}
              />
            );

          case "services":
            // If source is collection, use services from props, otherwise use custom
            const serviceData = block.source === "custom" 
              ? (block.customServices as unknown[])?.map((s: unknown, i: number) => ({
                  id: String(i),
                  ...(s as object),
                }))
              : services;
            return (
              <Services
                key={key}
                id={block.anchorId as string}
                badge={block.badge as string}
                headline={block.headline as string}
                highlightedText={block.highlightedText as string}
                description={block.description as string}
                services={serviceData as never}
              />
            );

          case "portfolio":
            return (
              <Portfolio
                key={key}
                id={block.anchorId as string}
                badge={block.badge as string}
                headline={block.headline as string}
                highlightedText={block.highlightedText as string}
                description={block.description as string}
                showFilters={block.showFilters as boolean}
                featuredOnly={block.featuredOnly as boolean}
                maxProjects={block.maxItems as number}
                projects={projects as never}
              />
            );

          case "about":
            return (
              <About
                key={key}
                id={block.anchorId as string}
                badge={block.badge as string}
                headline={block.headline as string}
                highlightedText={block.highlightedText as string}
                description={block.description as string}
                content={block.content}
                values={block.values as never}
                stats={block.stats as never}
              />
            );

          case "testimonials":
            return (
              <Testimonials 
                key={key} 
                id={block.anchorId as string}
                testimonials={testimonials as never}
                badge={block.badge as string}
                headline={block.headline as string}
                highlightedText={block.highlightedText as string}
                description={block.description as string}
                featuredOnly={block.featuredOnly as boolean}
              />
            );

          case "contact":
            return (
              <Contact
                key={key}
                id={block.anchorId as string}
                badge={block.badge as string}
                headline={block.headline as string}
                highlightedText={block.highlightedText as string}
                description={block.description as string}
                formTitle={block.formTitle as string}
                formDescription={block.formDescription as string}
                showContactInfo={block.showContactInfo as boolean}
                contactInfo={block.contactInfo as never}
              />
            );

          case "content":
            return (
              <ContentSection
                key={key}
                heading={block.heading as string}
                content={block.content}
                backgroundColor={block.backgroundColor as string}
              />
            );

          case "cta":
            return (
              <CTASection
                key={key}
                headline={block.headline as string}
                description={block.description as string}
                button={block.button as { text: string; link: string }}
                style={block.style as string}
              />
            );

          default:
            console.warn(`Unknown block type: ${block.blockType}`);
            return null;
        }
      })}
    </>
  );
}
