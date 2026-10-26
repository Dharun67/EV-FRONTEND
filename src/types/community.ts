export interface CommunityCharger {
  id: string;
  name: string;
  type: "Home" | "Apartment" | "Workplace" | "Hotel" | "Business" | "Community";
  location: string;
  distanceKm: number;
  powerKw: number;
  connector: string;
  pricePerKwh: number;
  status: "Available" | "Busy" | "Unavailable";
  rating: number;
  hostName: string;
  hostRating: number;
  amenities: string[];
  sessionsCompleted: number;
}

export interface CommunityHost {
  id: string;
  name: string;
  rating: number;
  sessions: number;
  responseRate: number;
}
