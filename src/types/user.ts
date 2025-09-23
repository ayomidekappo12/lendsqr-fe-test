export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
  fullName: string;
  bvn: string;
  gender: "Male" | "Female";
  maritalStatus: "Single" | "Married" | "Divorced" | "Widowed";
  children: number;
  typeOfResidence: string;
  levelOfEducation: string;
  employmentStatus: "Employed" | "Unemployed" | "Self-employed";
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  guarantors?: Guarantor[];
  tier: number;
  accountBalance: string;
  accountNumber: string;
  bank: string;

  // 🔑 For authentication
  password?: string;
  role?: string;
  token?: string;
}

export interface Guarantor {
  fullName: string;
  phoneNumber: string;
  email: string;
  relationship: string;
}

export interface UserStats {
  users: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
}
