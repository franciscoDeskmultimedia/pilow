"use client";

import { useLivePreview } from "@payloadcms/live-preview-react";
import BlockRenderer from "./BlockRenderer";

interface LiveContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  page: any; // Using any to avoid strict type dependency, requires .layout
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  services?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  projects?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  testimonials?: any[];
}

export default function LiveContent({ 
  page, 
  services, 
  projects, 
  testimonials 
}: LiveContentProps) {
  const { data } = useLivePreview({
    initialData: page,
    serverURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001",
    depth: 2,
  });

  return (
    <BlockRenderer
      blocks={data?.layout || []}
      services={services}
      projects={projects}
      testimonials={testimonials}
    />
  );
}
