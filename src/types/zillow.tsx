export type SearchFor = {
  location?: string;
  bedrooms?: string;
  type?: string;
};

export type MarketLocation = {
  longName: string;
  resourceId: string;
  areaId: string;
  type: string;
};

export type MarketData {
  areaName: string;
  areaType: string;
  date: string;
  marketTemperature: MarketTemperature;
  mediaRentPriceOverTime: MedianRentPriceOverTime;
  nearbyAreas: NearbyArea[];
  zillowRentalsSrpUrl: string;
}

export type MarketTemperature = {
  temperature: string;
}

export type MedianRentPriceOverTime = {
  currentYear: MedianRentPrice[];
  prevYear: MedianRentPrice[];
}

export type MedianRentPrice = {
  month: string;
  price: number;
}

export type NearbyArea = {
  areaId: string;
  areaType: string;
  city: string;
  name: string;
  resourceName: string;
}