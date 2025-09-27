// tests/storage.test.ts
import { storage as realStorage } from "../utils/storage";
import type { User } from "../types/user";

// --- Mock User Data ---
const mockUser: User = {
  id: "1",
  organization: "Lendsqr",
  username: "testuser",
  email: "test@example.com",
  phoneNumber: "1234567890",
  dateJoined: "2023-01-01",
  status: "Active",
  fullName: "Test User",
  bvn: "12345678901",
  gender: "Male",
  maritalStatus: "Single",
  children: 0,
  typeOfResidence: "Apartment",
  levelOfEducation: "BSc",
  employmentStatus: "Employed",
  sectorOfEmployment: "Tech",
  durationOfEmployment: "2 years",
  officeEmail: "office@example.com",
  monthlyIncome: ["1000", "2000"],
  loanRepayment: "200",
  tier: 1,
  accountNumber: "1234567890",
  bank: "Mock Bank",
  accountBalance: "5000",

  guarantors: [
    {
      fullName: "Jane Doe",
      phoneNumber: "0987654321",
      email: "jane@example.com",
      relationship: "Friend",
    },
  ],
};


// --- LocalStorage Mock ---
function mockLocalStorage() {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
}

describe("Storage Layer", () => {
  describe("LocalStorageBackup", () => {
    let storage: any;

    beforeAll(() => {
      Object.defineProperty(window, "localStorage", {
        value: mockLocalStorage(),
      });

      // Force fallback by disabling IndexedDB
      Object.defineProperty(window, "indexedDB", {
        value: undefined,
        configurable: true,
      });

      jest.resetModules();
      storage = require("../utils/storage").storage;
    });

    afterEach(() => {
      window.localStorage.clear();
    });

    it("saves and retrieves a user", async () => {
      await storage.saveUser(mockUser);
      const retrieved = await storage.getUser("1");
      expect(retrieved).toEqual(mockUser);
    });

    it("retrieves all users", async () => {
      await storage.saveUser(mockUser);
      const allUsers = await storage.getAllUsers();
      expect(allUsers).toHaveLength(1);
      expect(allUsers[0]).toEqual(mockUser);
    });

    it("deletes a user", async () => {
      await storage.saveUser(mockUser);
      await storage.deleteUser("1");
      const retrieved = await storage.getUser("1");
      expect(retrieved).toBeNull();
    });
  });

  describe("IndexedDB Storage", () => {
    let storage: any;
    let request: any;

    beforeAll(() => {
      // Simple IndexedDB mock
      request = {
        onsuccess: null,
        onerror: null,
        onupgradeneeded: null,
        result: {
          transaction: jest.fn(() => ({
            objectStore: jest.fn(() => ({
              put: jest.fn(() => ({ onsuccess: null, onerror: null })),
              get: jest.fn(() => ({ onsuccess: null, onerror: null })),
              getAll: jest.fn(() => ({ onsuccess: null, onerror: null })),
              delete: jest.fn(() => ({ onsuccess: null, onerror: null })),
            })),
          })),
        },
      };

      const indexedDBMock = {
        open: jest.fn(() => request),
      };

      Object.defineProperty(window, "indexedDB", {
        value: indexedDBMock,
        configurable: true,
      });

      jest.resetModules();
      storage = require("../utils/storage").storage;
    });

    it("initializes IndexedDB without crashing", async () => {
      const initPromise = storage.init();
      request.onsuccess({ target: request });
      await expect(initPromise).resolves.not.toThrow();
    });
  });
});
