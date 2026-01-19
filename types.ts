
export enum ServiceCategory {
  SUSTAINABILITY = 'Sustainability',
  FOOD_BEVERAGE = 'Food & Beverage',
  MANUFACTURING = 'Manufacturing/Distribution',
  FASHION_BEAUTY = 'Fashion & Beauty',
  ADVISORY = 'Corporate Advisory',
  DUE_DILIGENCE = 'Due Diligence',
  INSTRUMENTS = 'Financial Instruments'
}

export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  content: string;
  date: string;
}

export interface ValuationData {
  businessName: string;
  industry: string;
  annualRevenue: number;
  growthRate: number;
  ebitda: number;
  description: string;
}

export interface RealEstateDeal {
  propertyType: string;
  location: string;
  purchasePrice: number;
  estimatedRenovation: number;
  arv: number;
  rentalIncome: number;
}
