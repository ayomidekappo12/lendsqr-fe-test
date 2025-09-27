import { generateMockUsers, mockApi, getUserStats } from "@/utils/mockApi";
import { User } from "../types/user";

describe("generateMockUsers", () => {
  it("should generate the specified number of users", () => {
    const users = generateMockUsers(10);
    expect(users).toHaveLength(10);
  });

  it("should generate users with unique IDs", () => {
    const users = generateMockUsers(20);
    const ids = users.map((u) => u.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(users.length);
  });

  it("should generate valid email addresses", () => {
    const users = generateMockUsers(5);
    users.forEach((user) => {
      expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });
  });

  it("should assign statuses only from the allowed set", () => {
    const validStatuses: User["status"][] = [
      "Active",
      "Inactive",
      "Pending",
      "Blacklisted",
    ];
    const users = generateMockUsers(50);
    users.forEach((user) => {
      expect(validStatuses).toContain(user.status);
    });
  });

  it("should generate at least one guarantor per user", () => {
    const users = generateMockUsers(10);
    users.forEach((user) => {
      expect(user.guarantors).toBeDefined();
      expect(user.guarantors!.length).toBeGreaterThanOrEqual(1);
      expect(user.guarantors!.length).toBeLessThanOrEqual(2);
    });
  });

  it("should generate guarantors with valid fields", () => {
    const users = generateMockUsers(5);
    users.forEach((user) => {
      user.guarantors!.forEach((g) => {
        expect(typeof g.fullName).toBe("string");
        expect(g.phoneNumber).toMatch(/^0\d{10}$/); // Nigerian phone format in generator
        expect(g.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        expect(typeof g.relationship).toBe("string");
      });
    });
  });
});

describe("mockApi", () => {
  beforeAll(async () => {
    // Ensure mock users are generated
    await mockApi.getUsers();
  });

  it("should return paginated users", async () => {
    const { users, total } = await mockApi.getUsers(1, 50);
    expect(users).toHaveLength(50);
    expect(total).toBeGreaterThan(0);
  });

  it("should return a user by ID", async () => {
    const { users } = await mockApi.getUsers(1, 1);
    const user = await mockApi.getUserById(users[0].id);
    expect(user).not.toBeNull();
    expect(user?.id).toBe(users[0].id);
  });

  it("should return null for non-existent user ID", async () => {
    const user = await mockApi.getUserById("invalid_id");
    expect(user).toBeNull();
  });

  it("should return user statistics correctly", async () => {
    const { users } = await mockApi.getUsers(1, 100);
    const stats = getUserStats(users);
    expect(stats.users).toBe(users.length);
    expect(stats.activeUsers).toBeGreaterThanOrEqual(0);
    expect(stats.usersWithLoans).toBeGreaterThanOrEqual(0);
    expect(stats.usersWithSavings).toBeGreaterThanOrEqual(0);
  });

  it("should filter users by organization", async () => {
    const { users } = await mockApi.getUsers(1, 100);
    const org = users[0].organization;
    const filtered = await mockApi.filterUsers({ organization: org });
    expect(filtered.every((u) => u.organization === org)).toBe(true);
  });

  it("should filter users by status", async () => {
    const { users } = await mockApi.getUsers(1, 100);
    const status = users[0].status;
    const filtered = await mockApi.filterUsers({ status });
    expect(filtered.every((u) => u.status === status)).toBe(true);
  });
});
