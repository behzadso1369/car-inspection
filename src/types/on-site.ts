export type ExpertAssignmentStatus =
  | "Assigned"
  | "Accepted"
  | "EnRoute"
  | "Arrived"
  | "InProgress"
  | "Completed"
  | "Cancelled";

export type BodyZoneStatus =
  | "Ok"
  | "Painted"
  | "Damaged"
  | "Replaced"
  | "NotChecked";

export interface UserAddress {
  Id: number;
  Title: string;
  City: string;
  Street: string;
  Plaque: string;
  Lat: number;
  Lng: number;
  FullAddress?: string;
}

export interface OrderExpertStatus {
  HasAssignment: boolean;
  Status: ExpertAssignmentStatus;
  StatusText: string;
  ExpertName: string;
  AssignedAt: string | null;
  EnRouteAt: string | null;
  ArrivedAt: string | null;
  InProgressAt: string | null;
  CompletedAt: string | null;
}

export interface BodyReportZone {
  Id: number;
  CarBodyZoneId: number;
  Code: string;
  NameFa: string;
  ViewGroup: string;
  SortOrder: number;
  Status: BodyZoneStatus;
  Note: string | null;
  ImagePath: string | null;
}

export interface BodyReport {
  OrderId: number;
  ReportId: number;
  Status: string;
  CarDisplayName: string;
  CarColor: string;
  ChassisNumber: string;
  PlateNumber: string;
  InspectionDate: string;
  InspectionTime: string;
  OverallResult: string;
  SummaryNote: string;
  SubmittedAt: string | null;
  Zones: BodyReportZone[];
}

export interface ExpertAssignment {
  AssignmentId: number;
  OrderId: number;
  Status: ExpertAssignmentStatus;
  CustomerName: string;
  CustomerPhone: string;
  CarGroup: string;
  Address: string;
  ScheduledDate: string;
  ScheduledTime: string;
}

export interface SuggestedExpert {
  ExpertId: number;
  FullName: string;
  PhoneNumber: string;
  DistanceKm: number;
  ActiveAssignmentsCount: number;
  HasScheduleConflict: boolean;
  AvgRating: number;
  Score: number;
}

export const BODY_ZONE_STATUS_LABELS: Record<BodyZoneStatus, string> = {
  Ok: "سالم",
  Painted: "رنگ‌شده",
  Damaged: "آسیب‌دیده",
  Replaced: "تعویض‌شده",
  NotChecked: "بررسی‌نشده",
};

export const BODY_ZONE_STATUS_COLORS: Record<BodyZoneStatus, string> = {
  Ok: "#2ecc71",
  Painted: "#f0b429",
  Damaged: "#ff6b6b",
  Replaced: "#9b59b6",
  NotChecked: "#95a5a6",
};

export const EXPERT_STATUS_STEPS: { key: ExpertAssignmentStatus; label: string }[] = [
  { key: "Assigned", label: "تخصیص یافته" },
  { key: "Accepted", label: "پذیرفته" },
  { key: "EnRoute", label: "در مسیر" },
  { key: "Arrived", label: "رسیده" },
  { key: "InProgress", label: "در حال کارشناسی" },
  { key: "Completed", label: "تکمیل شده" },
];
