
import { 
  LayoutDashboard, Users, Settings, Globe, 
  TrendingUp, Newspaper, Mail, FileText, 
  Target, Landmark, Cpu, Lock, 
  BarChart3, Activity
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
      { id: 'about', label: 'Our Legacy', path: '/about' },
    ]
  },
  {
    id: 'clients-root',
    label: 'Sovereign Clients',
    path: '#',
    icon: Users,
    children: [
      {
        id: 'work',
        label: 'Client Work',
        path: '/work',
        icon: FileText,
        children: [
          { id: 'business-plans', label: 'Business Plans', path: '/business-plans' },
          { id: 'investor-decks', label: 'Investor Decks', path: '/investor-decks' },
          { id: 'financials', label: 'Financial Modeling', path: '/financials' },
        ]
      },
      {
        id: 'services',
        label: 'Strategic Services',
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
              { id: 'funding-service', label: 'Funding tranches', path: '/funding-service' },
              { id: 'risk-mitigation', label: 'Risk Mitigation', path: '/risk-mitigation' },
              { id: 'scaling-businesses', label: 'Scaling (Local/Intl)', path: '/scaling-businesses' },
              {
                id: 'due-diligence',
                label: 'Due Diligence',
                path: '/due-diligence',
                children: [
                  { id: 'security-checks', label: 'KYC/AML Vetting', path: '/kyc-node' },
                  { id: 'third-party-valuations', label: 'Entity Valuations', path: '/valuation' },
                  { id: 'feasibility-studies', label: 'Feasibility Studies', path: '/feasibility-studies' },
                ]
              }
            ]
          },
          { id: 'strategy', label: 'Corporate Strategy', path: '/strategy' },
        ]
      },
      {
        id: 'areas',
        label: 'Sector Coverage',
        path: '/areas',
        icon: Globe,
        children: [
          { id: 'real-estate', label: 'Real Estate', path: '/area-real-estate' },
          { id: 'technology', label: 'Technology', path: '/area-technology' },
          { id: 'health', label: 'Health', path: '/area-health' },
          { id: 'renewable-energy', label: 'Energy Nodes', path: '/area-renewable-energy' },
          { id: 'manufacturing', label: 'Manufacturing', path: '/area-manufacturing' },
        ]
      },
      {
        id: 'funding-clients',
        label: 'Funding Requirements',
        path: '/funding',
        icon: TrendingUp,
        children: [
          { id: 'debt', label: 'Debt Tranches', path: '/funding-debt' },
          { id: 'equity', label: 'Equity Partners', path: '/funding-equity' },
          { id: 'private-funds', label: 'Private Placements', path: '/funding-private-funds' },
        ]
      },
      { id: 'workshop', label: 'Strategic Workshop', path: '/workshop', icon: Cpu },
      { id: 'client-portal-link', label: 'Access Client Portal', path: '/client-portal/login', icon: Lock },
    ]
  },
  {
    id: 'investors-root',
    label: 'Investors',
    path: '#',
    icon: Target,
    children: [
      { id: 'inv-hub', label: 'Investors Hub', path: '/investors' },
      { id: 'inv-opps', label: 'Opportunities Hub', path: '/investors/opportunities' },
      { id: 'inv-wwd', label: 'What We Do', path: '/investors/what-we-do' },
      { 
        id: 'inv-expertise', 
        label: 'Investment Expertise', 
        path: '/investors/expertise',
        children: [
          { id: 'exp-early', label: 'Early-Stage Ventures', path: '/investors/expertise/early-stage' },
          { id: 'exp-growth', label: 'Growth-Stage Alpha', path: '/investors/expertise/growth-stage' },
          { id: 'exp-established', label: 'Established Yield', path: '/investors/expertise/established' },
          { id: 'exp-public', label: 'Public Equity Nodes', path: '/investors/expertise/public' },
          { id: 'exp-re-infra', label: 'Infrastructure & Real Estate', path: '/investors/expertise/real-estate-infra' },
          { id: 'exp-hnwi', label: 'HNWI High-ROI Tranches', path: '/investors/expertise/hnwi' },
        ]
      },
      { id: 'new-world-finance-link', label: 'New World of Finance', path: '/new-world-finance' },
      { id: 'inv-private', label: 'Private Membership', path: '/investors/private-membership' },
      { id: 'inv-faqs', label: 'Investors FAQs', path: '/investors/faqs' },
      { id: 'inv-disclaimer', label: 'Institutional Disclaimer', path: '/investors/disclaimer' },
      { id: 'investor-portal-link', label: 'Access Investors Portal', path: '/investor-portal/login', icon: Lock },
    ]
  },
  {
    id: 'media',
    label: 'Market Intelligence',
    path: '/media',
    icon: Newspaper,
    children: [
      { id: 'newsletters', label: 'Newsletters', path: '/newsletters' },
      { id: 'blogs', label: 'Technical Blogs', path: '/blogs' },
    ]
  },
  {
    id: 'contact',
    label: 'Engagement Node',
    path: '/contact',
    icon: Mail,
    children: [
      { id: 'schedule-meeting', label: 'Schedule Consultation', path: '/schedule-meeting' },
    ]
  }
];
