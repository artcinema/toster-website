'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { posts } from '@/data/posts';
import { fadeInUp, staggerChildren } from '@/lib/motion';

const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPage() {
  const [active, setActive] = React.useState('All');
  const filtered = active === 'All' ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      {/* Hero */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="yellow" className="mb-4">Blog</Badge>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="mb-5 text-4xl font-semibold tracking-tight text-[#0A0A0A] sm:text-5xl"
              style={{ lineHeight: 1.08 }}
            >
              Food delivery operations,<br />growth, and AI
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-[#525252] leading-relaxed">
              Practical guides from a team running 25+ delivery locations across 4 countries.
              No theory — just what works in production.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Category filter */}
      <section className="sticky top-0 z-10 border-b border-[#E5E5E5] bg-white/95 backdrop-blur-sm py-3">
        <Container>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active === cat
                    ? 'bg-[#0A0A0A] text-white'
                    : 'bg-[#F5F5F5] text-[#525252] hover:bg-[#E5E5E5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Posts grid */}
      <section className="bg-white py-16">
        <Container>
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((post) => (
              <motion.article
                key={post.slug}
                variants={fadeInUp}
                className="group flex flex-col rounded-2xl border border-[#E5E5E5] bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-[#FFD600]/15 px-3 py-1 text-xs font-semibold text-[#0A0A0A]">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#A3A3A3]">
                    <Clock className="h-3 w-3" />
                    {post.readingTime} min
                  </span>
                </div>

                <h2 className="mb-3 text-base font-semibold leading-snug text-[#0A0A0A] group-hover:text-[#525252] transition-colors line-clamp-3">
                  {post.title}
                </h2>

                <p className="mb-5 flex-1 text-sm leading-relaxed text-[#525252] line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#A3A3A3]">{formatDate(post.date)}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-1 text-xs font-semibold text-[#0A0A0A] hover:gap-2 transition-all"
                  >
                    Read <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-[#0A0A0A] py-16">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="mb-3 text-2xl font-semibold text-white">See Toster in action</h2>
            <p className="mb-7 text-white/60 text-sm">
              Everything in these articles is built into the platform. Book a demo and we&apos;ll walk through the exact workflows.
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
