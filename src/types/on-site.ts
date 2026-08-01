export type ExpertAssignmentStatus =
  | "PendingAssignment"
  | "Assigned"
  | "Accepted"
  | "Rejected"
  | "EnRoute"
  | "Arrived"
  | "InProgress"
  | "ReportSubmitted"
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

type ApiRecord = Record<string, unknown>;

function asRecord(value: unknown): ApiRecord | null {
  return value !== null && typeof value === "object"
    ? (value as ApiRecord)
    : null;
}

function readField<T>(
  record: ApiRecord,
  pascalCase: string,
  camelCase: string,
): T | undefined {
  return (record[pascalCase] ?? record[camelCase]) as T | undefined;
}

const EXPERT_STATUS_BY_NUMBER: Record<number, ExpertAssignmentStatus> = {
  0: "PendingAssignment",
  1: "Assigned",
  2: "Accepted",
  3: "Rejected",
  4: "EnRoute",
  5: "Arrived",
  6: "InProgress",
  7: "ReportSubmitted",
  8: "Completed",
  9: "Cancelled",
};

function normalizeExpertAssignmentStatus(
  value: unknown,
): ExpertAssignmentStatus {
  if (typeof value === "number") {
    return EXPERT_STATUS_BY_NUMBER[value] ?? "Assigned";
  }

  if (typeof value === "string") {
    const numericValue = Number(value);
    if (value.trim() !== "" && Number.isInteger(numericValue)) {
      return EXPERT_STATUS_BY_NUMBER[numericValue] ?? "Assigned";
    }
    return value as ExpertAssignmentStatus;
  }

  return "Assigned";
}

/**
 * The flow document uses DTO-style PascalCase while the production API
 * normally serializes responses as camelCase. Normalize both shapes here.
 */
export function normalizeOrderExpertStatus(
  value: unknown,
): OrderExpertStatus | null {
  const record = asRecord(value);
  if (!record) return null;

  return {
    HasAssignment: Boolean(readField(record, "HasAssignment", "hasAssignment")),
    Status: normalizeExpertAssignmentStatus(
      readField(record, "Status", "status"),
    ),
    StatusText: readField<string>(record, "StatusText", "statusText") ?? "",
    ExpertName: readField<string>(record, "ExpertName", "expertName") ?? "",
    AssignedAt:
      readField<string | null>(record, "AssignedAt", "assignedAt") ?? null,
    EnRouteAt:
      readField<string | null>(record, "EnRouteAt", "enRouteAt") ?? null,
    ArrivedAt:
      readField<string | null>(record, "ArrivedAt", "arrivedAt") ?? null,
    InProgressAt:
      readField<string | null>(record, "InProgressAt", "inProgressAt") ?? null,
    CompletedAt:
      readField<string | null>(record, "CompletedAt", "completedAt") ?? null,
  };
}

export function normalizeBodyReport(value: unknown): BodyReport | null {
  const record = asRecord(value);
  if (!record) return null;

  const rawZones = readField<unknown[]>(record, "Zones", "zones");
  const zones = Array.isArray(rawZones)
    ? rawZones.flatMap((rawZone) => {
        const zone = asRecord(rawZone);
        if (!zone) return [];

        return [
          {
            Id: readField<number>(zone, "Id", "id") ?? 0,
            CarBodyZoneId:
              readField<number>(zone, "CarBodyZoneId", "carBodyZoneId") ?? 0,
            Code: readField<string>(zone, "Code", "code") ?? "",
            NameFa: readField<string>(zone, "NameFa", "nameFa") ?? "",
            ViewGroup: readField<string>(zone, "ViewGroup", "viewGroup") ?? "",
            SortOrder: readField<number>(zone, "SortOrder", "sortOrder") ?? 0,
            Status:
              readField<BodyZoneStatus>(zone, "Status", "status") ??
              "NotChecked",
            Note: readField<string | null>(zone, "Note", "note") ?? null,
            ImagePath:
              readField<string | null>(zone, "ImagePath", "imagePath") ?? null,
          },
        ];
      })
    : [];

  return {
    OrderId: readField<number>(record, "OrderId", "orderId") ?? 0,
    ReportId: readField<number>(record, "ReportId", "reportId") ?? 0,
    Status: readField<string>(record, "Status", "status") ?? "",
    CarDisplayName:
      readField<string>(record, "CarDisplayName", "carDisplayName") ?? "",
    CarColor: readField<string>(record, "CarColor", "carColor") ?? "",
    ChassisNumber:
      readField<string>(record, "ChassisNumber", "chassisNumber") ?? "",
    PlateNumber: readField<string>(record, "PlateNumber", "plateNumber") ?? "",
    InspectionDate:
      readField<string>(record, "InspectionDate", "inspectionDate") ?? "",
    InspectionTime:
      readField<string>(record, "InspectionTime", "inspectionTime") ?? "",
    OverallResult:
      readField<string>(record, "OverallResult", "overallResult") ?? "",
    SummaryNote: readField<string>(record, "SummaryNote", "summaryNote") ?? "",
    SubmittedAt:
      readField<string | null>(record, "SubmittedAt", "submittedAt") ?? null,
    Zones: zones,
  };
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

export const EXPERT_STATUS_STEPS: {
  key: ExpertAssignmentStatus;
  label: string;
}[] = [
  { key: "PendingAssignment", label: "منتظر تخصیص" },
  { key: "Assigned", label: "تخصیص یافته" },
  { key: "Accepted", label: "پذیرفته" },
  { key: "EnRoute", label: "در مسیر" },
  { key: "Arrived", label: "رسیده" },
  { key: "InProgress", label: "در حال کارشناسی" },
  { key: "ReportSubmitted", label: "گزارش ثبت شده" },
  { key: "Completed", label: "تکمیل شده" },
];
