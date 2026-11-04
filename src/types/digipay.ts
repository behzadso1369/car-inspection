export type ApiEnvelope<T> = {
  isSuccess: boolean;
  statusMessage: string;
  resultObject: T;
};

export type InstallmentQuote = {
  paidFullyByWallet?: boolean;
  walletAmountUsed?: number;
  onlineAmount?: number;
  installmentAmount?: number;
  baseAmount: number;
  surchargePercent: number;
  surchargeAmount: number;
  payableAmount: number;
  title: string;
  displayText: string;
  vehicleKind?: VehicleKind;
  gateway?: "Digipay";
};

export type InstallmentStart = {
  paymentId?: number;
  providerId?: string;
  ticket?: string;
  paymentUrl?: string;
  paidFullyByWallet: boolean;
  walletAmountUsed?: number;
  gatewayAmount?: number;
  onlineAmount?: number;
  installmentAmount?: number;
  baseAmount?: number;
  surchargePercent?: number;
  surchargeAmount?: number;
  payableAmount?: number;
  title?: string;
  displayText?: string;
  amountRials?: number;
  requiresPayment: boolean;
  gateway: "Digipay";
  vehicleKind?: 2;
  message?: string;
};

export type InstallmentVerifyBody = {
  paymentId?: number;
  providerId?: string;
  trackingCode?: string;
  type?: number;
};

export type OrderPaymentStatus = {
  hasPayment: boolean;
  paymentId?: number;
  gateway?: "Digipay" | "Zibal" | string;
  trackId?: string;
  providerId?: string;
  ticket?: string;
  ticketType?: number;
  ticketTypeTitle?: string;
  isCredit?: boolean;
  status?: string;
  amount?: number;
  paidAt?: string;
};

export type VehicleKind = 1 | 2;
