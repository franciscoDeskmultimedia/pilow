import { getPayload } from "payload";
import config from "../src/payload/payload.config";
import path from "path";

async function createDummyPage() {
  console.log("Initializing Payload...");
  const payload = await getPayload({ config });

  const slug = "test-components";

  console.log(`Checking if page with slug '${slug}' already exists...`);
  const existingPages = await payload.find({
    collection: "pages",
    where: {
      slug: { equals: slug },
    },
    locale: "en",
  });

  if (existingPages.docs.length > 0) {
    console.log(`Deleting existing page with ID: ${existingPages.docs[0].id}`);
    await payload.delete({
      collection: "pages",
      id: existingPages.docs[0].id,
    });
  }

  const dummyPageData = {
    title: "Test Components Page",
    slug: slug,
    isHomepage: false,
    status: "published",
    layout: [
      // 1. Hero Block
      {
        blockType: "hero",
        badge: "[PAYLOAD] Hero Badge Test",
        headline: "[PAYLOAD] Hero Headline [HIGHLIGHT]",
        highlightedText: "[HIGHLIGHT]",
        description: "[PAYLOAD] This is a test description for the hero block. It should show this exact text.",
        primaryButton: {
          text: "[PAYLOAD] Hero Primary Button",
          link: "#primary-target",
        },
        secondaryButton: {
          text: "[PAYLOAD] Hero Secondary Button",
          link: "#secondary-target",
        },
        stats: [
          { value: "999%", label: "[PAYLOAD] Stat 1 Label" },
          { value: "888%", label: "[PAYLOAD] Stat 2 Label" },
        ],
        showCodePreview: true,
      },
      // 2. Services Block (Custom source)
      {
        blockType: "services",
        badge: "[PAYLOAD] Services Badge Test",
        headline: "[PAYLOAD] Services Headline [HIGHLIGHT]",
        highlightedText: "[HIGHLIGHT]",
        description: "[PAYLOAD] This is a test description for the services block.",
        source: "custom",
        customServices: [
          {
            title: "[PAYLOAD] Custom Service 1 Title",
            description: "[PAYLOAD] Custom Service 1 Description",
            icon: "code",
            features: [
              { feature: "[PAYLOAD] Service 1 Feature A" },
              { feature: "[PAYLOAD] Service 1 Feature B" },
            ],
          },
          {
            title: "[PAYLOAD] Custom Service 2 Title",
            description: "[PAYLOAD] Custom Service 2 Description",
            icon: "palette",
            features: [
              { feature: "[PAYLOAD] Service 2 Feature A" },
            ],
          },
        ],
      },
      // 3. Services Block (Collection source)
      {
        blockType: "services",
        badge: "[PAYLOAD] Services Collection Badge Test",
        headline: "[PAYLOAD] Services Collection Headline [HIGHLIGHT]",
        highlightedText: "[HIGHLIGHT]",
        description: "[PAYLOAD] This is a test description for the collection services block.",
        source: "collection",
      },
      // 4. Portfolio Block
      {
        blockType: "portfolio",
        badge: "[PAYLOAD] Portfolio Badge Test",
        headline: "[PAYLOAD] Portfolio Headline [HIGHLIGHT]",
        highlightedText: "[HIGHLIGHT]",
        description: "[PAYLOAD] This is a test description for the portfolio block.",
        showFilters: true,
        featuredOnly: false,
        maxItems: 4,
      },
      // 5. About Block
      {
        blockType: "about",
        badge: "[PAYLOAD] About Badge Test",
        headline: "[PAYLOAD] About Headline [HIGHLIGHT]",
        highlightedText: "[HIGHLIGHT]",
        description: "[PAYLOAD] This is a test description for the about block.",
        content: {
          root: {
            type: "root",
            children: [
              {
                type: "paragraph",
                children: [
                  {
                    type: "text",
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "[PAYLOAD] This is rich text content inside the about block, rendered from the content field.",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                textFormat: 0,
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            version: 1,
          },
        },
        values: [
          { title: "[PAYLOAD] About Value 1 Title", description: "[PAYLOAD] About Value 1 Desc", icon: "lightbulb" },
          { title: "[PAYLOAD] About Value 2 Title", description: "[PAYLOAD] About Value 2 Desc", icon: "lightning" },
        ],
        stats: [
          { value: "111", label: "[PAYLOAD] About Stat 1 Label" },
          { value: "222", label: "[PAYLOAD] About Stat 2 Label" },
        ],
      },
      // 6. Testimonials Block
      {
        blockType: "testimonials",
        badge: "[PAYLOAD] Testimonials Badge Test",
        headline: "[PAYLOAD] Testimonials Headline [HIGHLIGHT]",
        highlightedText: "[HIGHLIGHT]",
        description: "[PAYLOAD] This is a test description for the testimonials block.",
        source: "collection",
        featuredOnly: false,
      },
      // 7. Contact Block
      {
        blockType: "contact",
        badge: "[PAYLOAD] Contact Badge Test",
        headline: "[PAYLOAD] Contact Headline [HIGHLIGHT]",
        highlightedText: "[HIGHLIGHT]",
        description: "[PAYLOAD] This is a test description for the contact block.",
        formTitle: "[PAYLOAD] Contact Form Title Test",
        formDescription: "[PAYLOAD] Contact Form Description Test",
        showContactInfo: true,
        contactInfo: {
          email: "payload-test@pilow.dev",
          phone: "+1 (888) 888-8888",
          address: "Payload Test City, CA",
          socialLinks: [
            { platform: "twitter", url: "https://twitter.com/payload" },
            { platform: "github", url: "https://github.com/payload" },
          ],
        },
      },
      // 8. Content Block
      {
        blockType: "content",
        heading: "[PAYLOAD] Content Heading Test",
        content: {
          root: {
            type: "root",
            children: [
              {
                type: "paragraph",
                children: [
                  {
                    type: "text",
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "[PAYLOAD] Content rich text field test.",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                textFormat: 0,
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            version: 1,
          },
        },
        backgroundColor: "gray",
      },
      // 9. CTA Block
      {
        blockType: "cta",
        headline: "[PAYLOAD] CTA Headline Test",
        description: "[PAYLOAD] CTA Description Test",
        button: {
          text: "[PAYLOAD] CTA Button Text",
          link: "/cta-target",
        },
        style: "card",
      },
    ],
  };

  console.log("Creating dummy page...");
  const newPage = await payload.create({
    collection: "pages",
    data: dummyPageData,
    locale: "en",
  });

  console.log(`Successfully created dummy page with ID: ${newPage.id}`);
  process.exit(0);
}

createDummyPage().catch((err) => {
  console.error("Failed to create dummy page:", err);
  process.exit(1);
});
