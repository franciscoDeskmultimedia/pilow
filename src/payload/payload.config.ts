import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";

// Collections
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Services } from "./collections/Services";
import { Projects } from "./collections/Projects";
import { Testimonials } from "./collections/Testimonials";
// Globals
import { Settings } from "./collections/Settings";
import { Header } from "./globals/Header";
import { Footer } from "./globals/Footer";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, ".."),
    },
  },
  collections: [Users, Media, Pages, Services, Projects, Testimonials],
  globals: [Settings, Header, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "pilow-dev-secret-change-in-production",
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || "file:./pilow.db",
    },
  }),
  onInit: async (payload) => {
    // Seed content if needed
    try {
      // Dynamically import to avoid build issues if seed.ts uses node-only modules
      const { seed } = await import('../lib/seed');
      await seed(payload);
    } catch (error) {
      console.error('Seeding failed:', error);
    }
  },
});

