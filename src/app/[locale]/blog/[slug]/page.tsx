'use client';

import * as React from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { posts, getPostBySlug, getRelatedPosts } from '@/data/posts';
import { fadeInUp, staggerChildren } from '@/lib/motion';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : Array.isArray(params.slug) ? params.slug[0] : '';
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);

  return (
    <>
      {/* Header */}
      <section className="bg-white py-14 sm:py-20">
        <Container>
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl"
          >
            <motion.div variants={fadeInUp}>
              <Link
                href="/blog"
                className="mb-8 inline-flex items-center gap-1.5 text-sm text-[#A3A3A3] hover:text-[#0A0A0A] transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> All articles
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="mb-4 flex items-center gap-3">
              <span className="rounded-full bg-[#FFD600]/15 px-3 py-1 text-xs font-semibold text-[#0A0A0A]">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-[#A3A3A3]">
                <Clock className="h-3 w-3" />
                {post.readingTime} min read
              </span>
              <span className="text-xs text-[#A3A3A3]">{formatDate(post.date)}</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="mb-5 text-3xl font-semibold leading-tight text-[#0A0A0A] sm:text-4xl"
            >
              {post.title}
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg text-[#525252] leading-relaxed">
              {post.excerpt}
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Divider */}
      <div className="border-t border-[#E5E5E5]" />

      {/* Content */}
      <section className="bg-white py-14">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl"
          >
            <div
              className="blog-content max-w-none text-[#525252] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.div>
        </Container>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="border-t border-[#E5E5E5] bg-[#F5F5F5] py-16">
          <Container>
            <h2 className="mb-8 text-xl font-semibold text-[#0A0A0A]">Related articles</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group rounded-2xl border border-[#E5E5E5] bg-white p-5 transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-[#FFD600]/15 px-2.5 py-0.5 text-xs font-semibold text-[#0A0A0A]">
                      {p.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#A3A3A3]">
                      <Clock className="h-3 w-3" />
                      {p.readingTime} min
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold leading-snug text-[#0A0A0A] group-hover:text-[#525252] transition-colors line-clamp-3">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#525252] line-clamp-2">
                    {p.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#0A0A0A] group-hover:gap-2 transition-all">
                    Read <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#0A0A0A] py-16">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="mb-3 text-2xl font-semibold text-white">See Toster in action</h2>
            <p className="mb-7 text-white/60 text-sm">
              Everything in this article is built into the platform. Book a 30-minute demo.
            </p>
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 rounded-full bg-[#FFD600] px-6 py-3 text-sm font-semibold text-[#0A0A0A] hover:bg-[#FFE566] transition-colors"
            >
              Book a demo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
