
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Settings, 
  Globe, 
  TrendingUp, 
  Newspaper, 
  Mail,
  FileText,
  Calculator,
  ShieldAlert
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
      { id: 'home-testimonials', label: 'Testimonials', path: '/testimonials' },
      { id: 'home-featured', label: 'Featured', path: '/#featured' },
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
      { id: 'work-plans', label: 'Business Plans', path: '/work#business-plans' },
      { id: 'work-decks', label: 'Investor Decks', path: '/work#investor-decks' },
      { id: 'work-financials', label: 'Financials', path: '/work#financials' },
    ]
  },
  {
    id: 'services',
    label: 'Services',
    path: '/services',
    icon: Settings,
    children: [
      {
        id: 'services-tools',
        label: 'Advisory Tools',
        path: '#',
        children: [
          { id: 'tool-valuation', label: 'Enterprise Valuation', path: '/valuation', icon: Calculator },
          { id: 'tool-underwriting', label: 'RE Underwriting', path: '/underwriting', icon: ShieldAlert },
        ]
      },
      {
        id: 'services-cap',
        label: 'Capital Advisory',
        path: '/services#capital-advisory',
        children: [
          { id: 'cap-analysis', label: 'Analysis', path: '/services#analysis' },
          { id: 'cap-corp', label: 'Corporate Advisory', path: '/services#corporate-advisory' },
          { id: 'cap-raising', label: 'Raising Capital', path: '/services#raising-capital' },
          { id: 'cap-funding', label: 'Funding', path: '/services#funding' },
          { id: 'cap-risk', label: 'Risk Mitigation', path: '/services#risk-mitigation' },
          { id: 'cap-secured', label: 'Secured Depositor Programs', path: '/services#secured-depositor' },
          { id: 'cap-scaling', label: 'Scaling Businesses Locally/Internationalally', path: '/services#scaling' },
          { id: 'cap-hnwi', label: 'Assist HNWI Achieve High ROIs With Low Risk', path: '/services#hnwi' },
          {
            id: 'cap-due',
            label: 'Due Diligence',
            path: '/services#due-diligence',
            children: [
              { id: 'due-security', label: 'Security Checks/KYC/AML/Due Diligence', path: '/services#security-checks' },
              { id: 'due-valuations', label: 'Third-Party Valuations', path: '/services#valuations' },
              { id: 'due-feasibility', label: 'Feasibility Studies', path: '/services#feasibility' },
            ]
          }
        ]
      },
      { id: 'services-strategy', label: 'Strategy', path: '/services#strategy' },
    ]
  },
  {
    id: 'areas',
    label: 'Areas We Cover',
    path: '/areas',
    icon: Globe,
    children: [
      { id: 'area-re', label: 'Real Estate', path: '/areas#real-estate' },
      { id: 'area-tech', label: 'Technology', path: '/areas#technology' },
      { id: 'area-health', label: 'Health', path: '/areas#health' },
      { id: 'area-sports', label: 'Sports', path: '/areas#sports' },
      { id: 'area-renewable', label: 'Renewable Energy', path: '/areas#renewable-energy' },
      { id: 'area-sustain', label: 'Sustainability', path: '/areas#sustainability' },
      { id: 'area-food', label: 'Food & Beverage', path: '/areas#food-beverage' },
      { id: 'area-fashion', label: 'Fashion & Beauty', path: '/areas#fashion-beauty' },
      { id: 'area-aero', label: 'Aerospace', path: '/areas#aerospace' },
      { id: 'area-film', label: 'Film & Entertainment', path: '/areas#film-entertainment' },
      { id: 'area-mining', label: 'Mining', path: '/areas#mining' },
      { id: 'area-mfg', label: 'Manufacturing/Distribution', path: '/areas#manufacturing' },
    ]
  },
  {
    id: 'funding',
    label: 'Funding',
    path: '/funding',
    icon: TrendingUp,
    children: [
      { id: 'fund-debt', label: 'Debt', path: '/funding#debt' },
      { id: 'fund-equity', label: 'Equity', path: '/funding#equity' },
      { id: 'fund-private', label: 'Private Funds', path: '/funding#private-funds' },
      { 
        id: 'fund-new', 
        label: 'New World of Finance', 
        path: '/funding#new-world-of-finance',
        children: [
          { id: 'new-hybrid', label: 'Hybrid', path: '/funding#hybrid' },
          { id: 'new-btc-lending', label: 'BTC/USDT Lending Programs', path: '/funding#btc-lending' },
          { 
            id: 'new-assets', 
            label: 'Assets', 
            path: '/funding#assets',
            children: [
              { id: 'asset-btc-trade', label: 'BTC/USDT Trade Programs', path: '/funding#btc-trade' },
              { id: 'asset-lev', label: 'Leveraging Programs', path: '/funding#leveraging' },
              { id: 'asset-mon', label: 'Monetization', path: '/funding#monetization' },
              { id: 'asset-inst', label: 'Financial Instruments', path: '/funding#financial-instruments' },
            ]
          },
          { id: 'new-art', label: 'Fine Art', path: '/funding#fine-art' },
          { id: 'new-comm', label: 'Commodities', path: '/funding#commodities' },
          { id: 'new-trade', label: 'Trade Programs', path: '/funding#trade-programs' },
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
      { id: 'media-news', label: 'Newsletters', path: '/media#newsletters' },
      { id: 'media-blogs', label: 'Blogs', path: '/media#blogs' },
    ]
  },
  {
    id: 'contact',
    label: 'Contact Us',
    path: '/contact',
    icon: Mail,
    children: [
      { id: 'contact-meeting', label: 'Schedule A Meeting', path: '/contact#schedule-meeting' },
    ]
  }
];
