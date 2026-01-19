
import { 
  LayoutDashboard, Users, Briefcase, Settings, Globe, 
  TrendingUp, Newspaper, Mail, FileText, Calculator, 
  ShieldAlert, Scale, Search, Target, Landmark, Coins, 
  Zap, Gem, Building, Building2, Cpu, Stethoscope, 
  Medal, Wind, Leaf, Utensils, Rocket, Clapperboard, 
  Pickaxe, Factory, ShieldCheck, FileSearch, Lock
} from 'lucide-react';

export type NavItem = {
  id: string;
  label: string;
  path: string;
  icon?: any;
  children?: NavItem[];
};

export const navConfig: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: LayoutDashboard,
    children: [
      { id: 'testimonials', label: 'Testimonials', path: '/testimonials' },
      { id: 'featured', label: 'Featured', path: '/featured' },
    ]
  },
  {
    id: 'about',
    label: 'About Us',
    path: '/about',
    icon: Users,
  },
  {
    id: 'work',
    label: 'Work',
    path: '/work',
    icon: FileText,
    children: [
      { id: 'business-plans', label: 'Business Plans', path: '/business-plans' },
      { id: 'investor-decks', label: 'Investor Decks', path: '/investor-decks' },
      { id: 'financials', label: 'Financials', path: '/financials' },
    ]
  },
  {
    id: 'workshop',
    label: 'Workshop',
    path: '/workshop',
    icon: Cpu,
  },
  {
    id: 'services',
    label: 'Services',
    path: '/services',
    icon: Settings,
    children: [
      {
        id: 'capital-advisory',
        label: 'Capital Advisory',
        path: '/capital-advisory',
        children: [
          { id: 'analysis', label: 'Analysis', path: '/analysis' },
          { id: 'corporate-advisory', label: 'Corporate Advisory', path: '/corporate-advisory' },
          { id: 'raising-capital', label: 'Raising Capital', path: '/raising-capital' },
          { id: 'funding-service', label: 'Funding', path: '/funding-service' },
          { id: 'risk-mitigation', label: 'Risk Mitigation', path: '/risk-mitigation' },
          { id: 'secured-depositor-programs', label: 'Secured Depositor Programs', path: '/secured-depositor-programs' },
          { id: 'scaling-businesses', label: 'Scaling Businesses Locally/Internationalally', path: '/scaling-businesses' },
          { id: 'assist-hnwi', label: 'Assist HNWI Achieve High ROIs With Low Risk', path: '/assist-hnwi' },
          {
            id: 'due-diligence',
            label: 'Due Diligence',
            path: '/due-diligence',
            children: [
              { id: 'security-checks', label: 'Security Checks/KYC/AML/Due Diligence', path: '/kyc-node' },
              { id: 'real-estate-underwriting', label: 'Real Estate Underwriting', path: '/underwriting' },
              { id: 'third-party-valuations', label: 'Third-Party Valuations', path: '/valuation' },
              { id: 'feasibility-studies', label: 'Feasibility Studies', path: '/feasibility-studies' },
            ]
          }
        ]
      },
      { id: 'strategy', label: 'Strategy', path: '/strategy' },
    ]
  },
  {
    id: 'areas',
    label: 'Areas We Cover',
    path: '/areas',
    icon: Globe,
    children: [
      { id: 'real-estate', label: 'Real Estate', path: '/area-real-estate' },
      { id: 'technology', label: 'Technology', path: '/area-technology' },
      { id: 'health', label: 'Health', path: '/area-health' },
      { id: 'sports', label: 'Sports', path: '/area-sports' },
      { id: 'renewable-energy', label: 'Renewable Energy', path: '/area-renewable-energy' },
      { id: 'sustainability', label: 'Sustainability', path: '/area-sustainability' },
      { id: 'food-beverage', label: 'Food & Beverage', path: '/area-food-beverage' },
      { id: 'fashion-beauty', label: 'Fashion & Beauty', path: '/area-fashion-beauty' },
      { id: 'aerospace', label: 'Aerospace', path: '/area-aerospace' },
      { id: 'film-entertainment', label: 'Film & Entertainment', path: '/area-film-entertainment' },
      { id: 'mining', label: 'Mining', path: '/area-mining' },
      { id: 'manufacturing', label: 'Manufacturing/Distribution', path: '/area-manufacturing' },
    ]
  },
  {
    id: 'funding',
    label: 'Funding',
    path: '/funding',
    icon: TrendingUp,
    children: [
      { id: 'debt', label: 'Debt', path: '/funding-debt' },
      { id: 'equity', label: 'Equity', path: '/funding-equity' },
      { id: 'private-funds', label: 'Private Funds', path: '/funding-private-funds' },
      { 
        id: 'new-world-finance', 
        label: 'New World of Finance', 
        path: '/new-world-finance',
        children: [
          { id: 'hybrid', label: 'Hybrid', path: '/funding-hybrid' },
          { id: 'btc-lending', label: 'BTC/USDT Lending Programs', path: '/funding-btc-lending' },
          { 
            id: 'assets-node', 
            label: 'Assets', 
            path: '/funding-assets',
            children: [
              { id: 'btc-trade', label: 'BTC/USDT Trade Programs', path: '/funding-btc-trade' },
              { id: 'leveraging', label: 'Leveraging Programs', path: '/funding-leveraging' },
              { id: 'monetization', label: 'Monetization', path: '/funding-monetization' },
              { id: 'financial-instruments', label: 'Financial Instruments', path: '/funding-financial-instruments' },
            ]
          },
          { id: 'fine-art', label: 'Fine Art', path: '/funding-fine-art' },
          { id: 'commodities', label: 'Commodities', path: '/funding-commodities' },
          { id: 'trade-programs', label: 'Trade Programs', path: '/funding-trade-programs' },
        ]
      },
    ]
  },
  {
    id: 'media',
    label: 'Media',
    path: '/media',
    icon: Newspaper,
    children: [
      { id: 'newsletters', label: 'Newsletters', path: '/newsletters' },
      { id: 'blogs', label: 'Blogs', path: '/blogs' },
    ]
  },
  {
    id: 'portal',
    label: 'Portal Access',
    path: '/login',
    icon: Lock,
  },
  {
    id: 'contact',
    label: 'Contact Us',
    path: '/contact',
    icon: Mail,
    children: [
      { id: 'schedule-meeting', label: 'Schedule A Meeting', path: '/schedule-meeting' },
    ]
  }
];
