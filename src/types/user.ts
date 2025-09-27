/**
 * Core User Types
 * Clean, strongly typed, and future-proofed for scalability.
 */

/** User account status */
export type UserStatus = "Active" | "Inactive" | "Pending" | "Blacklisted";

/** User gender */
export type Gender = "Male" | "Female";

/** User marital status */
export type MaritalStatus = "Single" | "Married" | "Divorced" | "Widowed";

/** Employment status */
export type EmploymentStatus = "Employed" | "Unemployed" | "Self-employed";

/** Authentication roles (expandable) */
export type UserRole = "admin" | "manager" | "staff" | "customer";

/** Bank account structure (can be reused in other models later) */
export interface BankAccount {
  accountNumber: string;
  bank: string;
  accountBalance: string; // Keep as string for formatting (e.g. "₦50,000.00")
}

/** Social media handles */
export interface SocialProfiles {
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

/** Guarantor details */
export interface Guarantor {
  fullName: string;
  phoneNumber: string;
  email: string;
  relationship: string; // Could be improved with a union if relationships are fixed
}

/** Primary User interface */
export interface User extends BankAccount, SocialProfiles {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string; // ISO 8601 string — consistent across APIs
  status: UserStatus;
  fullName: string;
  bvn: string;
  gender: Gender;
  maritalStatus: MaritalStatus;
  children: number;
  typeOfResidence: string;
  levelOfEducation: string;
  employmentStatus: EmploymentStatus;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: [string, string];
  loanRepayment: string;
  guarantors?: Guarantor[];
  tier: number;

  /** For authentication */
  password?: string; // keep optional for mock/demo; omit in production DTOs
  role?: UserRole;
  token?: string;
}

/** Aggregated user statistics */
export interface UserStats {
  users: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
}
