import { User } from "../types/user";

// IndexedDB utilities for storing user details
const DB_NAME = "LendsqrDB";
const DB_VERSION = 1;
const USER_STORE = "users";

class Storage {
  private db: IDBDatabase | null = null;
  private initializing: Promise<void> | null = null;

  private async ensureDB(): Promise<void> {
    if (this.db) return;
    if (this.initializing) return this.initializing;

    this.initializing = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(USER_STORE)) {
          const store = db.createObjectStore(USER_STORE, { keyPath: "id" });
          store.createIndex("email", "email", { unique: false });
          store.createIndex("username", "username", { unique: false });
        }
      };
    });

    return this.initializing;
  }

  async saveUser(user: User): Promise<void> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([USER_STORE], "readwrite");
      const store = transaction.objectStore(USER_STORE);
      const request = store.put(user);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getUser(id: string): Promise<User | null> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([USER_STORE], "readonly");
      const store = transaction.objectStore(USER_STORE);
      const request = store.get(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  }

  async getAllUsers(): Promise<User[]> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([USER_STORE], "readonly");
      const store = transaction.objectStore(USER_STORE);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async deleteUser(id: string): Promise<void> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([USER_STORE], "readwrite");
      const store = transaction.objectStore(USER_STORE);
      const request = store.delete(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([USER_STORE], "readonly");
      const store = transaction.objectStore(USER_STORE);
      const index = store.index("email");
      const request = index.get(email);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  }
}

// Fallback to localStorage if IndexedDB is not available
class LocalStorageBackup {
  private storageKey = "lendsqr_users";

  private log(msg: string) {
    console.warn(`[LocalStorageBackup] ${msg}`);
  }

  saveUser(user: User): Promise<void> {
    try {
      const users = this.getAllUsers();
      const existingIndex = users.findIndex((u) => u.id === user.id);

      if (existingIndex >= 0) {
        users[existingIndex] = user;
      } else {
        users.push(user);
      }

      localStorage.setItem(this.storageKey, JSON.stringify(users));
      this.log(`Saved user ${user.id}`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getUser(id: string): Promise<User | null> {
    try {
      const users = this.getAllUsers();
      const user = users.find((u) => u.id === id) || null;
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getAllUsers(): User[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  deleteUser(id: string): Promise<void> {
    try {
      const users = this.getAllUsers().filter((u) => u.id !== id);
      localStorage.setItem(this.storageKey, JSON.stringify(users));
      this.log(`Deleted user ${id}`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getUserByEmail(email: string): Promise<User | null> {
    try {
      const users = this.getAllUsers();
      const user = users.find((u) => u.email === email) || null;
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

// Create storage instance with fallback
export const storage = (() => {
  if (typeof window !== "undefined" && "indexedDB" in window) {
    return new Storage();
  } else {
    console.warn("IndexedDB not available, falling back to localStorage");
    return new LocalStorageBackup();
  }
})();
