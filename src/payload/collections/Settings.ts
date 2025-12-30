import type { GlobalConfig } from "payload";

export const Settings: GlobalConfig = {
  slug: "settings",
  admin: {
    group: "Admin",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      defaultValue: "Pilow",
      required: true,
    },
    {
      name: "siteTagline",
      type: "text",
      defaultValue: "Premium Web Development Agency",
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "contact",
      type: "group",
      label: "Contact Information",
      fields: [
        {
          name: "email",
          type: "email",
          defaultValue: "hello@pilow.dev",
        },
        {
          name: "phone",
          type: "text",
          defaultValue: "+1 (555) 123-4567",
        },
        {
          name: "address",
          type: "textarea",
          defaultValue: "San Francisco, CA",
        },
      ],
    },
    {
      name: "social",
      type: "group",
      label: "Social Media Links",
      fields: [
        {
          name: "twitter",
          type: "text",
          label: "Twitter/X URL",
        },
        {
          name: "linkedin",
          type: "text",
          label: "LinkedIn URL",
        },
        {
          name: "github",
          type: "text",
          label: "GitHub URL",
        },
        {
          name: "dribbble",
          type: "text",
          label: "Dribbble URL",
        },
      ],
    },
    {
      name: "footer",
      type: "group",
      label: "Footer Settings",
      fields: [
        {
          name: "ctaHeadline",
          type: "text",
          defaultValue: "Ready to Get Started?",
        },
        {
          name: "ctaDescription",
          type: "text",
          defaultValue: "Let's create something extraordinary together.",
        },
        {
          name: "ctaButtonText",
          type: "text",
          defaultValue: "Start Your Project",
        },
        {
          name: "copyright",
          type: "text",
          defaultValue: "Pilow. All rights reserved.",
        },
      ],
    },
    {
      name: "seo",
      type: "group",
      label: "Default SEO",
      fields: [
        {
          name: "defaultTitle",
          type: "text",
          defaultValue: "Pilow | Premium Web Development Agency",
        },
        {
          name: "defaultDescription",
          type: "textarea",
          defaultValue:
            "Pilow is a premium web development agency crafting exceptional digital experiences.",
        },
        {
          name: "defaultOgImage",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
  ],
};
