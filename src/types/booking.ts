export interface BookingStation {
  id: string;
  name: string;
  location: string;
  distance: number;
  rating: number;
  availableConnectors: number;
  totalConnectors: number;
  power: number;
  pricePerKwh: number;
  isRecommended?: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
  status: "available" | "busy" | "unavailable";
}

export interface ChargerConnector {
  id: string;
  name: string;
  type: "AC" | "DC Fast";
  power: number;
  status: "available" | "busy" | "unavailable";
}

export interface Booking {
  stationId: string;
  date: string;
  time: string;
  connectorId: string;
  durationMinutes: number;
  estimatedEnergyKwh: number;
  estimatedCost: number;
}
