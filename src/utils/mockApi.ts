import { User, UserStats, Guarantor } from "../types/user";

// Generate realistic mock data
const organizations = ["Lendsqr", "Irorun", "Lendstar"];
const firstNames = [
  "Grace",
  "Debby",
  "Tosin",
  "Adedot",
  "Ibrahim",
  "Kemi",
  "John",
  "Jane",
  "David",
  "Sarah",
];
const lastNames = [
  "Effiom",
  "Ogana",
  "Dakurame",
  "Johnson",
  "Williams",
  "Brown",
  "Davis",
  "Miller",
  "Wilson",
  "Moore",
];
const statuses: User["status"][] = [
  "Active",
  "Inactive",
  "Pending",
  "Blacklisted",
];
const genders: User["gender"][] = ["Male", "Female"];
const educationLevels = ["B.Sc", "M.Sc", "Ph.D", "HND", "OND", "Secondary"];
const employmentStatuses: User["employmentStatus"][] = [
  "Employed",
  "Unemployed",
  "Self-employed",
];
const sectors = [
  "FinTech",
  "Technology",
  "Healthcare",
  "Education",
  "Banking",
  "Insurance",
];
const residenceTypes = [
  "Parent's Apartment",
  "Own Apartment",
  "Rented Apartment",
  "Family House",
];

function generatePhoneNumber(): string {
  return `0${Math.floor(Math.random() * 9000000000) + 1000000000}`;
}

function generateEmail(firstName: string, lastName: string): string {
  const domains = ["gmail.com", "yahoo.com", "outlook.com", "lendsqr.com"];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
}

function generateBVN(): string {
  return String(Math.floor(Math.random() * 90000000000) + 10000000000);
}

function generateAccountNumber(): string {
  return String(Math.floor(Math.random() * 9000000000) + 1000000000);
}

function generateAmount(): string {
  const amount = Math.floor(Math.random() * 5000000) + 50000;
  return `₦${amount.toLocaleString()}.00`;
}

function generateDateJoined(): string {
  const start = new Date(2020, 0, 1);
  const end = new Date();
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return randomDate.toISOString(); // ISO format for reliable filtering
}

function generateGuarantors(): Guarantor[] {
  const count = Math.random() > 0.5 ? 1 : 2;
  const list: Guarantor[] = [];
  for (let i = 0; i < count; i++) {
    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];
    list.push({
      fullName: `${first} ${last}`,
      phoneNumber: generatePhoneNumber(),
      email: generateEmail(first, last),
      relationship: Math.random() > 0.5 ? "Friend" : "Colleague",
    });
  }
  return list;
}

export function generateMockUsers(count: number = 500): User[] {
  const users: User[] = [];

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fullName = `${firstName} ${lastName}`;
    const email = generateEmail(firstName, lastName);
    const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(
      Math.random() * 100
    )}`;

    users.push({
      id: `user_${i + 1}`,
      organization:
        organizations[Math.floor(Math.random() * organizations.length)],
      username,
      email,
      phoneNumber: generatePhoneNumber(),
      dateJoined: generateDateJoined(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      fullName,
      bvn: generateBVN(),
      gender: genders[Math.floor(Math.random() * genders.length)],
      maritalStatus: Math.random() > 0.6 ? "Single" : "Married",
      children: Math.floor(Math.random() * 4),
      typeOfResidence:
        residenceTypes[Math.floor(Math.random() * residenceTypes.length)],
      levelOfEducation:
        educationLevels[Math.floor(Math.random() * educationLevels.length)],
      employmentStatus:
        employmentStatuses[
          Math.floor(Math.random() * employmentStatuses.length)
        ],
      sectorOfEmployment: sectors[Math.floor(Math.random() * sectors.length)],
      durationOfEmployment: `${Math.floor(Math.random() * 10) + 1} years`,
      officeEmail: generateEmail(firstName, lastName),
      monthlyIncome: generateAmount(),
      loanRepayment: generateAmount(),
      tier: Math.floor(Math.random() * 3) + 1,
      accountBalance: generateAmount(),
      accountNumber: generateAccountNumber(),
      bank: "Providus Bank",
      twitter: Math.random() > 0.5 ? `@${username}` : undefined,
      facebook: Math.random() > 0.5 ? fullName : undefined,
      instagram: Math.random() > 0.5 ? `@${username}` : undefined,
      guarantors: generateGuarantors(),
    });
  }

  return users;
}

export function getUserStats(users: User[]): UserStats {
  return {
    users: users.length,
    activeUsers: users.filter((u) => u.status === "Active").length,
    usersWithLoans: Math.floor(users.length * 0.25), // 25% have loans
    usersWithSavings: Math.floor(users.length * 0.41), // 41% have savings
  };
}

// Mock API functions
let mockUsers: User[] = [];

export const mockApi = {
  async getUsers(
    page: number = 1,
    limit: number = 100
  ): Promise<{ users: User[]; total: number }> {
    if (mockUsers.length === 0) {
      mockUsers = generateMockUsers(500);
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
    const start = (page - 1) * limit;
    const end = start + limit;
    return { users: mockUsers.slice(start, end), total: mockUsers.length };
  },

  async getUserById(id: string): Promise<User | null> {
    if (mockUsers.length === 0) {
      mockUsers = generateMockUsers(500);
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockUsers.find((user) => user.id === id) || null;
  },

  async getUserStats(): Promise<UserStats> {
    if (mockUsers.length === 0) {
      mockUsers = generateMockUsers(500);
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
    return getUserStats(mockUsers);
  },

  async filterUsers(filters: Partial<User>): Promise<User[]> {
    if (mockUsers.length === 0) {
      mockUsers = generateMockUsers(500);
    }
    await new Promise((resolve) => setTimeout(resolve, 200));

    return mockUsers.filter((u) => {
      return (
        (!filters.organization ||
          u.organization
            .toLowerCase()
            .includes(filters.organization.toLowerCase())) &&
        (!filters.username ||
          u.username.toLowerCase().includes(filters.username.toLowerCase())) &&
        (!filters.email ||
          u.email.toLowerCase().includes(filters.email.toLowerCase())) &&
        (!filters.phoneNumber || u.phoneNumber.includes(filters.phoneNumber)) &&
        (!filters.status || u.status === filters.status) &&
        (!filters.dateJoined || u.dateJoined.startsWith(filters.dateJoined))
      );
    });
  },
};
