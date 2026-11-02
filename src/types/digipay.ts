export type ApiEnvelope<T> = {
  isSuccess: boolean;
  statusMessage: string;
  resultObject: T;
};

export type InstallmentStart = {
  paymentId?: number;
  providerId?: string;
  ticket?: string;
  paymentUrl?: string;
  paidFullyByWallet: boolean;
  walletAmountUsed: number;
  gatewayAmount: number;
  amountRials?: number;
  requiresPayment: boolean;
  gateway: "Digipay";
  vehicleKind?: 2;
  message?: string;
};

export type OrderPaymentStatus = {
  hasPayment: boolean;
  paymentId?: number;
  gateway?: "Digipay" | "Zibal" | string;
  trackId?: string;
  providerId?: string;
  status?: string;
  amount?: number;
  ticketTypeTitle?: string;
  isCredit?: boolean;
  paidAt?: string;
};

export type VehicleKind = 1 | 2;
