
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface MetaData {
  title: string;
  description: string;
}

const METADATA_MAP: Record<string, MetaData> = {
  '/': {
    title: 'Sovereign Capital Advisory | Federgreen Consulting',
    description: 'Bespoke capital architecture and institutional liquidity tranches for global enterprises and private syndicates.'
  },
  '/about': {
    title: 'Our Legacy | Federgreen Consulting',
    description: 'Exploring the heritage of Federgreen Consulting and our multi-generational commitment to institutional growth.'
  },
  '/work': {
    title: 'Institutional Work | Federgreen Consulting',
    description: 'A portfolio of sophisticated financial artifacts, strategic narratives, and capital stack optimizations.'
  },
  '/workshop': {
    title: 'Generative AI Workshop | Federgreen Consulting',
    description: 'Institutional-grade generative tools for asset analysis and strategic vision synthesis in our secure workshop.'
  },
  '/services': {
    title: 'Strategic Services | Federgreen Consulting',
    description: 'Comprehensive capital advisory, corporate strategy, and risk mitigation tranches for global markets.'
  },
  '/areas': {
    title: 'Sector Coverage | Federgreen Consulting',
    description: 'Institutional advisory nodes across Real Estate, Technology, Aerospace, and Renewable Energy sectors.'
  },
  '/funding': {
    title: 'Institutional Funding | Federgreen Consulting',
    description: 'Strategic bridges between visionary projects and tier-1 debt, equity, and private capital tranches.'
  },
  '/media': {
    title: 'Market Intelligence | Federgreen Consulting',
    description: 'Technical briefings and proprietary market sentiment nodes from the Federgreen senior advisory desk.'
  },
  '/contact': {
    title: 'Engagement Node | Federgreen Consulting',
    description: 'Initiate a direct strategic briefing with the Federgreen senior advisory team.'
  },
  '/testimonials': {
    title: 'Institutional Trust | Federgreen Consulting',
    description: 'Vetted performance feedback from our global network of sovereign clients and institutional investors.'
  },
  '/valuation': {
    title: 'Enterprise Valuation | Federgreen Consulting',
    description: 'Algorithmic business model assessment using industry-standard DCF and multi-factor multiples.'
  },
  '/underwriting': {
    title: 'Sovereign Underwriting | Federgreen Consulting',
    description: 'Sub-second algorithmic credit memorandum generation for institutional multi-family and commercial tranches.'
  },
  '/kyc-node': {
    title: 'Identity Onboarding | Federgreen Consulting',
    description: 'Secure, AI-powered compliance transmission for sovereign-grade identity verification.'
  },
  '/login': {
    title: 'Institutional Gateway | Federgreen Consulting',
    description: 'Authorized access to the Federgreen private client and investor portal nodes.'
  },
  '/investors': {
    title: 'Investors Hub | Federgreen Consulting',
    description: 'Strategic orchestration and alpha-centric deal flow for family offices and institutional syndicates.'
  },
  '/investors/opportunities': {
    title: 'Opportunities Hub | Federgreen Consulting',
    description: 'Restricted portfolio of vetted capital opportunities across global institutional tranches.'
  },
  '/investors/membership': {
    title: 'Membership Hub | Federgreen Consulting',
    description: 'Institutional clearance for exclusive deal-flow ingestion and strategic alpha tranches.'
  }
};

const DEFAULT_META: MetaData = {
  title: 'Federgreen Consulting | Sovereign-Grade Capital Advisory',
  description: 'Specialized financial architecture for global visionaries, bridging traditional capital with modern liquidity tranches.'
};

const SEOManager: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const metadata = METADATA_MAP[path] || DEFAULT_META;

    // Update Document Title
    document.title = metadata.title;

    // Update Meta Description
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', metadata.description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = metadata.description;
      document.getElementsByTagName('head')[0].appendChild(meta);
    }

    // Optional: Log Node Transition for Diagnostics
    console.debug(`SEO Node Synced: ${path}`);
  }, [location]);

  return null; // Side-effect only component
};

export default SEOManager;
