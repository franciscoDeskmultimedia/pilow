"use client";

import { useLivePreview } from "@payloadcms/live-preview-react";
import BlockRenderer from "./BlockRenderer";

interface LiveContentProps {
  page: any; // Using any to avoid strict type dependency, requires .layout
  services?: any[];
  projects?: any[];
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
    serverURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
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
