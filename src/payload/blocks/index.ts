import type { Block } from "payload";

export const HeroBlock: Block = {
  slug: "hero",
  labels: {
    singular: "Hero Section",
    plural: "Hero Sections",
  },
  fields: [
    {
      name: "badge",
      type: "text",
      defaultValue: "Web Development Excellence",
      localized: true,
    },
    {
      name: "headline",
      type: "text",
      required: true,
      defaultValue: "We Craft Digital Experiences That Inspire",
      localized: true,
    },
    {
      name: "highlightedText",
      type: "text",
      label: "Highlighted Text (gradient)",
      defaultValue: "Digital Experiences",
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "primaryButton",
      type: "group",
      fields: [
        { name: "text", type: "text", defaultValue: "Start Your Project", localized: true },
        { name: "link", type: "text", defaultValue: "#contact" },
      ],
    },
    {
      name: "secondaryButton",
      type: "group",
      fields: [
        { name: "text", type: "text", defaultValue: "View Our Work", localized: true },
        { name: "link", type: "text", defaultValue: "#portfolio" },
      ],
    },
    {
      name: "stats",
      type: "array",
      label: "Statistics",
      maxRows: 4,
      fields: [
        { name: "value", type: "text", required: true },
        { name: "label", type: "text", required: true, localized: true },
      ],
    },
    {
      name: "showCodePreview",
      type: "checkbox",
      label: "Show Code Preview Animation",
      defaultValue: true,
    },
  ],
};

export const ServicesBlock: Block = {
  slug: "services",
  labels: {
    singular: "Services Section",
    plural: "Services Sections",
  },
  fields: [
    { name: "badge", type: "text", defaultValue: "What We Do", localized: true },
    { name: "headline", type: "text", defaultValue: "Services That Drive Results", localized: true },
    { name: "highlightedText", type: "text", defaultValue: "Results", localized: true },
    { name: "description", type: "textarea", localized: true },
    {
      name: "source",
      type: "select",
      options: [
        { label: "From Services Collection", value: "collection" },
        { label: "Custom Services", value: "custom" },
      ],
      defaultValue: "collection",
    },
    {
      name: "customServices",
      type: "array",
      admin: {
        condition: (_, siblingData) => siblingData?.source === "custom",
      },
      fields: [
        { name: "title", type: "text", required: true, localized: true },
        { name: "description", type: "textarea", required: true, localized: true },
        {
          name: "icon",
          type: "select",
          options: [
            { label: "Code", value: "code" },
            { label: "Palette", value: "palette" },
            { label: "Cart", value: "cart" },
            { label: "Computer", value: "computer" },
            { label: "Mobile", value: "mobile" },
            { label: "Lightning", value: "lightning" },
          ],
        },
        {
          name: "features",
          type: "array",
          fields: [{ name: "feature", type: "text", localized: true }],
        },
      ],
    },
  ],
};

export const PortfolioBlock: Block = {
  slug: "portfolio",
  labels: {
    singular: "Portfolio Section",
    plural: "Portfolio Sections",
  },
  fields: [
    { name: "badge", type: "text", defaultValue: "Our Work", localized: true },
    { name: "headline", type: "text", defaultValue: "Featured Projects", localized: true },
    { name: "highlightedText", type: "text", defaultValue: "Projects", localized: true },
    { name: "description", type: "textarea", localized: true },
    {
      name: "showFilters",
      type: "checkbox",
      label: "Show Category Filters",
      defaultValue: true,
    },
    {
      name: "featuredOnly",
      type: "checkbox",
      label: "Show Only Featured Projects",
      defaultValue: true,
    },
    {
      name: "maxItems",
      type: "number",
      label: "Maximum Projects to Show",
      defaultValue: 6,
    },
  ],
};

export const AboutBlock: Block = {
  slug: "about",
  labels: {
    singular: "About Section",
    plural: "About Sections",
  },
  fields: [
    { name: "badge", type: "text", defaultValue: "About Us", localized: true },
    { name: "headline", type: "text", defaultValue: "Passionate About Building the Future of Web", localized: true },
    { name: "highlightedText", type: "text", defaultValue: "Future of Web", localized: true },
    { name: "content", type: "richText", localized: true },
    {
      name: "values",
      type: "array",
      label: "Company Values",
      fields: [
        { name: "title", type: "text", required: true, localized: true },
        { name: "description", type: "text", required: true, localized: true },
        {
          name: "icon",
          type: "select",
          options: [
            { label: "💡 Lightbulb", value: "lightbulb" },
            { label: "👥 Users", value: "users" },
            { label: "✓ Badge", value: "badge" },
            { label: "⚡ Lightning", value: "lightning" },
          ],
        },
      ],
    },
    {
      name: "stats",
      type: "array",
      label: "Statistics",
      fields: [
        { name: "value", type: "text", required: true },
        { name: "label", type: "text", required: true, localized: true },
      ],
    },
  ],
};

export const TestimonialsBlock: Block = {
  slug: "testimonials",
  labels: {
    singular: "Testimonials Section",
    plural: "Testimonials Sections",
  },
  fields: [
    { name: "badge", type: "text", defaultValue: "Testimonials", localized: true },
    { name: "headline", type: "text", defaultValue: "What Our Clients Say", localized: true },
    { name: "highlightedText", type: "text", defaultValue: "Clients", localized: true },
    { name: "description", type: "textarea", localized: true },
    {
      name: "source",
      type: "select",
      options: [
        { label: "From Testimonials Collection", value: "collection" },
        { label: "Custom Testimonials", value: "custom" },
      ],
      defaultValue: "collection",
    },
    {
      name: "featuredOnly",
      type: "checkbox",
      label: "Show Only Featured",
      defaultValue: true,
      admin: {
        condition: (_, siblingData) => siblingData?.source === "collection",
      },
    },
  ],
};

export const ContactBlock: Block = {
  slug: "contact",
  labels: {
    singular: "Contact Section",
    plural: "Contact Sections",
  },
  fields: [
    { name: "badge", type: "text", defaultValue: "Get in Touch", localized: true },
    { name: "headline", type: "text", defaultValue: "Ready to Start Your Project?", localized: true },
    { name: "highlightedText", type: "text", defaultValue: "Project", localized: true },
    { name: "description", type: "textarea", localized: true },
    { name: "formTitle", type: "text", defaultValue: "Let's Build Something Amazing", localized: true },
    { name: "formDescription", type: "textarea", localized: true },
    {
      name: "showContactInfo",
      type: "checkbox",
      label: "Show Contact Information",
      defaultValue: true,
    },
  ],
};

export const ContentBlock: Block = {
  slug: "content",
  labels: {
    singular: "Content Block",
    plural: "Content Blocks",
  },
  fields: [
    { name: "heading", type: "text", localized: true },
    { name: "content", type: "richText", localized: true },
    {
      name: "backgroundColor",
      type: "select",
      options: [
        { label: "White", value: "white" },
        { label: "Light Gray", value: "gray" },
        { label: "Brand Gradient", value: "gradient" },
      ],
      defaultValue: "white",
    },
  ],
};

export const CTABlock: Block = {
  slug: "cta",
  labels: {
    singular: "Call to Action",
    plural: "Calls to Action",
  },
  fields: [
    { name: "headline", type: "text", required: true, localized: true },
    { name: "description", type: "textarea", localized: true },
    {
      name: "button",
      type: "group",
      fields: [
        { name: "text", type: "text", defaultValue: "Get Started", localized: true },
        { name: "link", type: "text", defaultValue: "/contact" },
      ],
    },
    {
      name: "style",
      type: "select",
      options: [
        { label: "Full Width Banner", value: "banner" },
        { label: "Centered Card", value: "card" },
      ],
      defaultValue: "banner",
    },
  ],
};

// Export all blocks as an array
export const pageBlocks = [
  HeroBlock,
  ServicesBlock,
  PortfolioBlock,
  AboutBlock,
  TestimonialsBlock,
  ContactBlock,
  ContentBlock,
  CTABlock,
];
