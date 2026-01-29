'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { certificates, Certificate } from '@/data/certificates';

export default function CertificatesSection() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const types = ['all', 'certificate', 'seminar'];
  
  const filteredCerts = selectedType === 'all' 
    ? certificates 
    : certificates.filter(c => c.type === selectedType);

  const handleViewCert = (cert: Certificate) => {
    setSelectedCert(cert);
    setIsDialogOpen(true);
  };

  return (
    <section className="section bg-[var(--bg-secondary)] relative" id="certificates">
      <div className="grid-pattern opacity-20" />
      
      {/* Glowing orbs - Blue theme */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[var(--blue-600)] rounded-full opacity-10 blur-[120px]" />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-[var(--accent-cyan)] rounded-full opacity-10 blur-[100px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[var(--accent-yellow)]/20 text-[var(--accent-yellow)] border-[var(--accent-yellow)]/30">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-yellow)] mr-2" />
            Achievements
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Certificates & <span className="gradient-text">Training</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Professional certifications and seminars that have shaped my expertise.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center mb-12">
          <Tabs value={selectedType} onValueChange={setSelectedType}>
            <TabsList className="bg-[var(--bg-card)] border border-[var(--border-secondary)] p-1.5 rounded-2xl">
              {types.map((type) => (
                <TabsTrigger
                  key={type}
                  value={type}
                  className="px-6 py-2.5 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[var(--blue-600)] data-[state=active]:to-[var(--accent-cyan)] data-[state=active]:text-white data-[state=active]:shadow-[var(--glow-blue)] capitalize"
                >
                  {type === 'all' ? '🎯 All' : type === 'certificate' ? '🏆 Certificates' : '📚 Seminars'}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((certificate, index) => (
            <Card
              key={index}
              className="glass-card group cursor-pointer overflow-hidden"
              onClick={() => handleViewCert(certificate)}
            >
              {/* Certificate image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent z-10" />
                <Image
                  src={`/certificates/${certificate.image}`}
                  alt={certificate.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Type badge */}
                <div className="absolute top-4 left-4 z-20">
                  <Badge className={`backdrop-blur-md ${
                    certificate.type === 'certificate' 
                      ? 'bg-[var(--accent-yellow)]/20 text-[var(--accent-yellow)] border-[var(--accent-yellow)]/30'
                      : 'bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] border-[var(--accent-cyan)]/30'
                  }`}>
                    {certificate.type === 'certificate' ? '🏆 Certificate' : '📚 Seminar'}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-[var(--blue-400)] transition-colors">
                    {certificate.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)]">{certificate.issuer}</p>
                </div>

                {/* Date */}
                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-secondary)]">
                  <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                    <span>📅</span>
                    <span>{certificate.date}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[var(--blue-400)] hover:text-white hover:bg-[var(--blue-600)]/20"
                  >
                    View →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results */}
        {filteredCerts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-[var(--text-muted)]">No certificates found in this category.</p>
          </div>
        )}
      </div>

      {/* Certificate Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl bg-[var(--bg-card)] border-[var(--border-primary)] text-white">
          {selectedCert && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl gradient-text">{selectedCert.title}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[var(--border-secondary)]">
                  <Image
                    src={`/certificates/${selectedCert.image}`}
                    alt={selectedCert.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-muted)]">Issued by</p>
                    <p className="text-white font-medium">{selectedCert.issuer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[var(--text-muted)]">Date</p>
                    <p className="text-white font-medium">{selectedCert.date}</p>
                  </div>
                </div>

                <Badge className={`w-fit ${
                  selectedCert.type === 'certificate' 
                    ? 'bg-[var(--accent-yellow)]/20 text-[var(--accent-yellow)]'
                    : 'bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)]'
                }`}>
                  {selectedCert.type === 'certificate' ? '🏆 Certificate' : '📚 Seminar'}
                </Badge>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
