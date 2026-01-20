"use client";

import { useLivePreview } from "@payloadcms/live-preview-react";
import Image from "next/image";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Header, { HeaderProps } from "@/components/Header";
import Footer, { FooterProps } from "@/components/Footer";

interface ProjectTemplateProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project: any; // Using any for flexibility with Payload types
  header: HeaderProps;
  footer: FooterProps;
}

export default function ProjectTemplate({ project: initialProject, header, footer }: ProjectTemplateProps) {
  const { data: project } = useLivePreview({
    initialData: initialProject,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    depth: 2,
  });

  if (!project) return null;

  return (
    <>
      <Header {...header} />
      <main className="min-h-screen bg-pilow-light dark:bg-gray-900 pt-24 pb-20 transition-colors duration-300">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            {project.category && (
              <span className="inline-block px-4 py-1 rounded-full bg-pilow-blue/10 dark:bg-pilow-ocean/20 text-pilow-blue dark:text-pilow-cyan text-sm font-semibold mb-6 capitalize">
                {project.category.replace('-', ' ')}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6">
              {project.title}
            </h1>
            {project.description && (
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {project.description}
              </p>
            )}
          </div>

          {/* Featured Image */}
          {project.featuredImage && (
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl mb-16 border border-gray-100 dark:border-gray-800">
               {typeof project.featuredImage === 'object' && project.featuredImage.url && (
                <Image
                  src={project.featuredImage.url}
                  alt={project.featuredImage.alt || project.title}
                  fill
                  className="object-cover"
                  priority
                />
               )}
            </div>
          )}

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Sidebar / Info */}
            <div className="lg:col-span-1 space-y-8">
              {/* Project Info Card */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Project Details</h3>
                
                {project.tags && project.tags.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {project.tags.map((tagItem: any, i: number) => (
                        <span key={i} className="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm rounded-lg border border-gray-100 dark:border-gray-600 transition-colors duration-300">
                          {tagItem.tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.projectUrl && (
                  <div>
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full bg-pilow-blue hover:bg-pilow-blue/90 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                    >
                      Visit Live Site
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg prose-blue dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                {project.fullDescription && (
                   <RichText data={project.fullDescription} />
                )}
                {!project.fullDescription && (
                  <p className="text-gray-500 dark:text-gray-400 italic">No detailed description available.</p>
                )}
              </div>
            </div>
          </div>

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-20 max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {project.gallery.map((item: any, i: number) => (
                  item.image && typeof item.image === 'object' && item.image.url && (
                    <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={item.image.url}
                        alt={item.image.alt || `Gallery image ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer {...footer} />
    </>
  );
}
