'use client';
import React, { useState } from 'react';
import { useLanguage } from '@/lib/useLanguage';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import HeroSection from './HeroSection';
import TrustStats from './TrustStats';
import JobCategories from './JobCategories';
import FeaturedJobs from './FeaturedJobs';
import PopularLocations from './PopularLocations';
import HowItWorks from './HowItWorks';
import JobSeekerBenefits from './JobSeekerBenefits';
import RecommendedPreview from './RecommendedPreview';
import ApplicationTrackingPreview from './ApplicationTrackingPreview';
import CareerResources from './CareerResources';
import AIInterviewPrep from './AIInterviewPrep';
import FinalCTA from './FinalCTA';
import ComingSoonModal from '@/components/ComingSoonModal';

export default function LandingPageClient() {
  const { language, changeLanguage, t } = useLanguage();
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar language={language} onLanguageChange={changeLanguage} t={t} activePage="/" />
      <main id="main-content">
        <HeroSection t={t} />
        <TrustStats />
        <JobCategories />
        <FeaturedJobs t={t} />
        <PopularLocations />
        <HowItWorks />
        <JobSeekerBenefits />
        <RecommendedPreview />
        <ApplicationTrackingPreview />
        <CareerResources />
        <AIInterviewPrep onOpenModal={() => setIsComingSoonOpen(true)} />
        <FinalCTA />
      </main>
      <PublicFooter />
      <ComingSoonModal isOpen={isComingSoonOpen} onClose={() => setIsComingSoonOpen(false)} />
    </div>
  );
}