export interface RescueUnit {
  id: string;
  name: string;
  distanceKm: number;
  etaMinutes: number;
  serviceType: "Mobile EV Charging" | "Roadside Assistance" | "Multi-Service Rescue";
  status: "Available" | "Busy" | "Assigned" | "On The Way";
  driverName: string;
  driverRating: number;
}

export interface RescueRequest {
  id: string;
  assistanceType: "Emergency Charging" | "Vehicle Breakdown" | "Flat Tyre" | "Accident / Emergency";
  batteryPercentage: number;
  location: string;
  status: "Requested" | "Searching" | "Assigned" | "On The Way" | "Completed";
  etaMinutes: number;
}
