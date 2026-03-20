// Mock data until API integration
export type RequestStatus = "pending" | "approved" | "rejected";
export type AbsenceType = "vacation" | "sick" | "personal" | "remote";

export interface AbsenceRequest {
  id: string;
  employee: {
    name: string;
    role: string;
    avatar?: string;
    initials: string;
    department: string;
  };
  type: AbsenceType;
  startDate: Date;
  endDate: Date;
  days: number;
  reason?: string;
  status: RequestStatus;
  submittedAt: Date;
  comment?: string; // manager comment on rejection
}

export const MOCK_REQUESTS: AbsenceRequest[] = [
  {
    id: "req-001",
    employee: { name: "Ana Ferreira", role: "Product Designer", initials: "AF", department: "Product" },
    type: "vacation",
    startDate: new Date(2026, 3, 7),
    endDate: new Date(2026, 3, 18),
    days: 10,
    reason: "Annual family vacation — booked months in advance.",
    status: "pending",
    submittedAt: new Date(2026, 2, 18),
  },
  {
    id: "req-002",
    employee: { name: "Bruno Coelho", role: "Backend Engineer", initials: "BC", department: "Engineering" },
    type: "sick",
    startDate: new Date(2026, 2, 21),
    endDate: new Date(2026, 2, 22),
    days: 2,
    reason: "Severe migraine, doctor prescribed rest.",
    status: "pending",
    submittedAt: new Date(2026, 2, 20),
  },
  {
    id: "req-003",
    employee: { name: "Cláudia Martins", role: "QA Engineer", initials: "CM", department: "Engineering" },
    type: "personal",
    startDate: new Date(2026, 2, 25),
    endDate: new Date(2026, 2, 25),
    days: 1,
    reason: "Personal appointment.",
    status: "pending",
    submittedAt: new Date(2026, 2, 19),
  },
  {
    id: "req-004",
    employee: { name: "Daniel Santos", role: "Sales Manager", initials: "DS", department: "Sales" },
    type: "remote",
    startDate: new Date(2026, 3, 1),
    endDate: new Date(2026, 3, 5),
    days: 5,
    status: "approved",
    submittedAt: new Date(2026, 2, 15),
  },
  {
    id: "req-005",
    employee: { name: "Eva Lima", role: "Marketing Lead", initials: "EL", department: "Marketing" },
    type: "vacation",
    startDate: new Date(2026, 4, 12),
    endDate: new Date(2026, 4, 23),
    days: 10,
    reason: "Summer holiday.",
    status: "approved",
    submittedAt: new Date(2026, 2, 10),
  },
  {
    id: "req-006",
    employee: { name: "Filipe Ramos", role: "DevOps Engineer", initials: "FR", department: "Engineering" },
    type: "sick",
    startDate: new Date(2026, 2, 10),
    endDate: new Date(2026, 2, 12),
    days: 3,
    reason: "Flu.",
    status: "rejected",
    submittedAt: new Date(2026, 2, 9),
    comment: "Please submit a medical certificate for sick leaves over 2 days.",
  },
];

export const TYPE_CONFIG: Record<AbsenceType, { label: string; color: string; bg: string }> = {
  vacation: { label: "Vacation", color: "text-orange-600", bg: "bg-orange-50 border-orange-200" },
  sick: { label: "Sick Leave", color: "text-red-600", bg: "bg-red-50 border-red-200" },
  personal: { label: "Personal", color: "text-blue-600", bg: "bg-blue-50 border-blue-200" },
  remote: { label: "Remote Work", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
};

export const STATUS_CONFIG: Record<RequestStatus, { label: string; color: string; dot: string }> = {
  pending:  { label: "Pending",  color: "text-amber-600 bg-amber-50 border-amber-200",   dot: "bg-amber-500" },
  approved: { label: "Approved", color: "text-emerald-600 bg-emerald-50 border-emerald-200", dot: "bg-emerald-500" },
  rejected: { label: "Rejected", color: "text-red-600 bg-red-50 border-red-200",        dot: "bg-red-500" },
};
