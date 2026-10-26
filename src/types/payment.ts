export interface Wallet {
  balance: number;
  pendingBalance: number;
  rewardCredits: number;
}

export interface PaymentMethod {
  id: string;
  type: "UPI" | "Card" | "Net Banking";
  label: string;
  maskedDetails: string;
  isPrimary: boolean;
}

export interface Transaction {
  id: string;
  type: "Charging" | "Wallet Top-up" | "Emergency Rescue" | "Refund" | "Booking" | "Other";
  description: string;
  date: string;
  amount: number;
  paymentMethod: string;
  status: "Completed" | "Pending" | "Failed" | "Refunded";
}
