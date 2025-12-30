"use client";

import Image from "next/image";
import Link from "next/link";

export interface FooterProps {
  logo?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
  } | null;
  copyright?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
  navItems?: Array<{
    link: {
      type: "reference" | "custom";
      reference?: {
        slug: string;
      } | null;
      url?: string;
      label: string;
    };
  }>;
}

const defaultFooterLinks = {
  services: [
    { label: "Web Development", href: "#services" },
    { label: "UI/UX Design", href: "#services" },
    { label: "E-Commerce", href: "#services" },
    { label: "CMS Development", href: "#services" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const defaultSocialLinks = [
  { label: "Twitter", href: "#", icon: "𝕏" },
  { label: "LinkedIn", href: "#", icon: "in" },
  { label: "GitHub", href: "#", icon: "⌘" },
  { label: "Dribbble", href: "#", icon: "◉" },
];

function getSocialIcon(platform: string) {
    switch (platform.toLowerCase()) {
        case "twitter": return "𝕏";
        case "linkedin": return "in";
        case "github": return "⌘";
        case "instagram": return "IG";
        case "facebook": return "f";
        default: return "◉";
    }
}

export default function Footer({ logo, copyright, socialLinks, navItems }: FooterProps) {
  const currentYear = new Date().getFullYear();

  // Use dynamic nav items or defaults if not provided
  const serviceLinks = defaultFooterLinks.services;
  
  // Create company links from navItems or default
  const companyLinks = navItems ? navItems.map(item => {
    let href = item.link.url || "#";
    if (item.link.type === "reference" && item.link.reference?.slug) {
        href = item.link.reference.slug === "home" ? "/" : `/${item.link.reference.slug}`;
    }
    return { label: item.link.label, href };
  }) : defaultFooterLinks.company;

  const displaySocialLinks = socialLinks?.map(s => ({
      label: s.platform,
      href: s.url,
      icon: getSocialIcon(s.platform)
  })) || defaultSocialLinks;

  return (
    <footer className="bg-pilow-slate-dark text-white" role="contentinfo">
      {/* CTA Section */}
      <div className="border-b border-white/10">
        <div className="container py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Ready to Get Started?
              </h2>
              <p className="text-white/60 text-lg">
                Let&apos;s create something extraordinary together.
              </p>
            </div>
            <Link href="#contact" className="btn-primary bg-pilow-cyan text-pilow-slate-dark hover:bg-white">
              Start Your Project →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
               {logo?.url ? (
                  <Image src={logo.url} alt={logo.alt || "Pilow"} width={logo.width || 120} height={logo.height || 40} className="h-10 w-auto brightness-0 invert" />
               ) : (
                  <Image src="/logo.png" alt="Pilow" width={120} height={40} className="h-10 w-auto brightness-0 invert" />
               )}
            </Link>
            <p className="text-white/60 mb-6 max-w-sm">
              Pilow is a premium web development agency crafting exceptional digital 
              experiences that drive business growth.
            </p>
            <div className="flex gap-3">
              {displaySocialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={`Follow us on ${social.label}`}
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-pilow-ocean transition-colors text-sm font-bold"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {defaultFooterLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p>© {currentYear} {copyright || "Pilow. All rights reserved."}</p>
            <p>Crafted with ❤️ and lots of ☕</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
