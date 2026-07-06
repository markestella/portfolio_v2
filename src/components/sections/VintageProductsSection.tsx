'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { products } from '@/data/products';

const statusLabels = {
  available: 'Available',
  'coming-soon': 'Coming Soon',
  'private-demo': 'Private Demo',
};

export default function VintageProductsSection() {
  return (
    <section className="section relative" id="products">
      <div className="grid-pattern opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <div className="mb-12">
          <div className="font-mono text-sm text-[var(--syntax-comment)] mb-2">
            {'//'} Section: Products
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="syntax-keyword">function</span>{' '}
            <span className="syntax-function">getProducts</span>
            <span className="syntax-bracket">()</span>{' '}
            <span className="syntax-bracket">{'{'}</span>
          </h2>
        </div>

        <div className="pl-4 sm:pl-8 mb-8">
          <div className="font-mono text-sm text-[var(--syntax-comment)] mb-4">
            {'//'} Commercial apps available for demos, licensing, and custom deployment
          </div>

          <div className="grid gap-6">
            {products.map((product, index) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="vintage-card overflow-hidden"
              >
                <div className="relative aspect-video w-full overflow-hidden border-b border-[var(--ide-tab-border)] bg-[var(--espresso-900)]">
                  <Image
                    src={product.image}
                    alt={`${product.name} product screenshot`}
                    fill
                    sizes="(min-width: 1024px) 1100px, 100vw"
                    className="object-cover object-top"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--espresso-900)]/80 via-transparent to-transparent" />
                  <div className="absolute left-4 right-4 top-4 flex flex-wrap items-center gap-3">
                    <span className="px-2 py-1 text-xs font-mono bg-[var(--gold-accent)] text-[var(--espresso-900)] rounded">
                      PRODUCT-{String(index + 1).padStart(3, '0')}
                    </span>
                    <span className="px-2 py-1 text-xs font-mono bg-[var(--espresso-800)]/90 text-[var(--parchment-200)] rounded">
                      {statusLabels[product.status]}
                    </span>
                  </div>
                  <div className="absolute left-4 right-4 bottom-4">
                    <h3 className="text-2xl sm:text-4xl font-bold text-[var(--parchment-100)] drop-shadow">
                      {product.name}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm sm:text-base text-[var(--gold-accent)] drop-shadow">
                      {product.tagline}
                    </p>
                  </div>
                </div>

                <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
                  <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[var(--ide-tab-border)]">
                    <h4 className="font-mono text-sm text-[var(--syntax-comment)] mb-3">
                      {'//'} Product summary
                    </h4>
                    <p className="text-[var(--parchment-300)] leading-relaxed mb-5">
                      {product.summary}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {product.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs font-mono bg-[var(--espresso-600)] text-[var(--parchment-300)] rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-6">
                    <div>
                      <h4 className="font-mono text-sm text-[var(--syntax-comment)] mb-3">
                        {'//'} Who it is for
                      </h4>
                      <p className="text-[var(--parchment-300)] leading-relaxed">
                        {product.audience}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <h4 className="font-mono text-sm text-[var(--syntax-comment)] mb-3">
                          {'//'} Pain points
                        </h4>
                        <ul className="space-y-2">
                          {product.problem.map((item) => (
                            <li key={item} className="text-sm text-[var(--parchment-300)] flex gap-2">
                              <span className="text-[var(--destructive)]">-</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-mono text-sm text-[var(--syntax-comment)] mb-3">
                          {'//'} Business outcomes
                        </h4>
                        <ul className="space-y-2">
                          {product.outcomes.map((item) => (
                            <li key={item} className="text-sm text-[var(--parchment-300)] flex gap-2">
                              <span className="text-[var(--accent-green)]">+</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-mono text-sm text-[var(--syntax-comment)] mb-3">
                        {'//'} Feature presentation outline
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {product.features.map((feature) => (
                          <div
                            key={feature}
                            className="rounded border border-[var(--ide-tab-border)] bg-[var(--espresso-700)] px-3 py-2 text-sm text-[var(--parchment-300)]"
                          >
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-mono text-sm text-[var(--syntax-comment)] mb-3">
                        {'//'} Commercial model
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {product.commercialModel.map((item) => (
                          <span
                            key={item}
                            className="px-3 py-1 text-sm bg-[var(--espresso-600)] text-[var(--parchment-200)] rounded"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      {product.presentationUrl ? (
                        <a
                          href={product.presentationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-vintage flex-1 text-center"
                        >
                          View Presentation
                        </a>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="btn-outline-vintage flex-1 opacity-60 cursor-not-allowed"
                        >
                          Presentation Coming Soon
                        </button>
                      )}
                      <a
                        href="#contact"
                        onClick={(event) => {
                          event.preventDefault();
                          window.dispatchEvent(
                            new CustomEvent('prefill-contact', {
                              detail: { subject: product.inquirySubject },
                            })
                          );
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="btn-vintage flex-1 text-center"
                      >
                        Request Product Demo
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          <span className="syntax-bracket">{'}'}</span>
        </h2>
      </motion.div>
    </section>
  );
}
