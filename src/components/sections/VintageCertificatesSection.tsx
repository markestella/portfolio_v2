'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { certificates } from '@/data/certificates';

export default function VintageCertificatesSection() {
  return (
    <section className="section relative" id="certificates">
      <div className="grid-pattern opacity-20" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        {/* Section Header */}
        <div className="mb-12">
          <div className="font-mono text-sm text-[var(--syntax-comment)] mb-2">
            {'//'} Section: Certificates & Training
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="syntax-keyword">const</span>{' '}
            <span className="syntax-function">certificates</span>{' '}
            <span className="syntax-bracket">=</span>{' '}
            <span className="syntax-bracket">[</span>
          </h2>
        </div>

        {/* Certificates Grid */}
        <div className="pl-4 sm:pl-8 mb-8">
          <div className="font-mono text-sm text-[var(--syntax-comment)] mb-4">
            {'//'} {certificates.length} certifications & training
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="vintage-card overflow-hidden group"
              >
                {/* Certificate Image */}
                <div className="relative h-40 overflow-hidden bg-[var(--espresso-600)]">
                  <Image
                    src={`/certificates/${cert.image}`}
                    alt={cert.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--espresso-800)] to-transparent opacity-60" />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 text-xs font-mono rounded ${
                      cert.type === 'certificate' 
                        ? 'bg-[var(--gold-accent)] text-[var(--espresso-900)]' 
                        : 'bg-[var(--syntax-type)] text-[var(--espresso-900)]'
                    }`}>
                      {cert.type === 'certificate' ? '📜 Cert' : '📚 Seminar'}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-[var(--parchment-500)]">{cert.date}</span>
                    <span className="text-xs font-mono text-[var(--syntax-string)]">{cert.category}</span>
                  </div>
                  
                  <h3 className="font-bold text-[var(--parchment-100)] text-sm mb-1 group-hover:text-[var(--gold-accent)] transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                  
                  <p className="text-xs text-[var(--parchment-400)]">
                    {cert.issuer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Closing bracket */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          <span className="syntax-bracket">]</span>
          <span className="text-[var(--parchment-500)]">;</span>
        </h2>
      </motion.div>
    </section>
  );
}
