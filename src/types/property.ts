export type Currency = 'USD' | 'BYN' | 'EUR';

export type DealType = 'all' | 'sale' | 'rent';

export type PropertyCategory = 'all' | 'apartment' | 'house' | 'commercial';

export interface Property {
  id: string;
  title: string;
  dealType: 'sale' | 'rent';
  category: 'apartment' | 'house' | 'commercial';
  priceUSD: number;
  rooms: number;
  totalArea: number; // m²
  livingArea?: number;
  kitchenArea?: number;
  floor?: number;
  totalFloors?: number;
  year: number;
  city: string;
  district: string;
  address: string;
  metro?: string;
  metroDistance?: string; // e.g. "5 мин пешком"
  renovation: 'Дизайнерский' | 'Евроремонт' | 'Современный' | 'Без отделки';
  buildingType: string;
  ceilingHeight?: number;
  description: string;
  features: string[];
  imageUrl: string;
  galleryUrls: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  isNewBuilding: boolean;
  seller: {
    name: string;
    agency?: string;
    phone: string;
    verified: boolean;
  };
  createdAt: string;
}

export interface FilterState {
  searchQuery: string;
  dealType: DealType;
  category: PropertyCategory;
  rooms: number[]; // e.g. [1, 2]
  priceMin: number;
  priceMax: number;
  district: string;
  metro: string;
  isNewBuildingOnly: boolean;
  sortBy: 'featured' | 'price_asc' | 'price_desc' | 'area_desc' | 'newest';
}
