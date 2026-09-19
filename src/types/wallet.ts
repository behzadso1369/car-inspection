export interface ApiEnvelope<T> {
  isSuccess: boolean;
  statusMessage: string;
  resultObject: T;
  take?: number | null;
  skip?: number | null;
  countData?: number | null;
}

export interface WalletBalance {
  userId: string;
  balance: number;
  walletId: number;
}

export type WalletTransactionType = 1 | 2 | 3 | 4 | 5;

export interface WalletTransaction {
  id: number;
  type: WalletTransactionType;
  typeTitle: string;
  amount: number;
  balanceAfter: number;
  orderId: number | null;
  description: string | null;
  createdOn: string;
}

export interface ChargePlan {
  id: number;
  title: string;
  description: string | null;
  payAmount: number;
  creditAmount: number;
  bonusAmount: number;
  sortOrder: number;
}

export interface ChargeStart {
  chargeId: number;
  paymentId: number;
  trackId: number;
  paymentUrl: string;
  payAmount: number;
  creditAmount: number;
  planTitle: string;
}

export interface CheckoutPreview {
  orderId: number;
  orderPrice: number;
  discount: number;
  payable: number;
  walletBalance: number;
  useWallet: boolean;
  allowWalletPayment: boolean;
  walletCanCover: number;
  gatewayAmount: number;
  canPayFullyByWallet: boolean;
}

export interface OrderMoveResult {
  isEndFlow: boolean;
  orderId: number;
  discountCode: string | null;
  price: number;
  discount: number;
  finalPrice: number;
  paymentUrl: string | null;
  trackId: number | null;
  paymentId: number | null;
  requiresPayment: boolean;
  paidFullyByWallet: boolean;
  walletAmountUsed: number;
  gatewayAmount: number;
}

export interface WalletGiftPreview {
  carGroupId: number;
  carInspectionTypeId: number | null;
  ourPrice: number;
  giftAmount: number;
  minGiftAmount: number;
  maxGiftAmount: number;
  minOurPrice: number;
  maxOurPrice: number;
  isGiftEnabled: boolean;
}

export interface WalletSettings {
  id: number;
  giftAmountPerOrder: number;
  isGiftEnabled: boolean;
  allowWalletPayment: boolean;
}
