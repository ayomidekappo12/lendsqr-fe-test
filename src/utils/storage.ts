import { User } from "../types/user";

/**
 * Constants for IndexedDB configuration
 */
const DB_NAME = "LendsqrDB";
const DB_VERSION = 1;
const USER_STORE = "users";

/**
 * Storage class using IndexedDB as the primary persistence layer.
 * Provides CRUD operations for user records.
 */
class Storage {
  private db: IDBDatabase | null = null;

  /**
   * Initialize IndexedDB connection.
   * Creates object store and indexes if not already present.
   */
  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
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
  }

  /**
   * Save or update a user in IndexedDB.
   */
  async saveUser(user: User): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction([USER_STORE], "readwrite");
      const store = tx.objectStore(USER_STORE);
      const request = store.put(user);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  /**
   * Retrieve a user by ID.
   */
  async getUser(id: string): Promise<User | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction([USER_STORE], "readonly");
      const store = tx.objectStore(USER_STORE);
      const request = store.get(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  }

  /**
   * Retrieve all users from IndexedDB.
   */
  async getAllUsers(): Promise<User[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction([USER_STORE], "readonly");
      const store = tx.objectStore(USER_STORE);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  /**
   * Delete a user by ID.
   */
  async deleteUser(id: string): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction([USER_STORE], "readwrite");
      const store = tx.objectStore(USER_STORE);
      const request = store.delete(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

/**
 * Fallback storage class that uses localStorage.
 * Provides the same interface as IndexedDB storage for consistency.
 */
class LocalStorageBackup {
  private storageKey = "lendsqr_users";

  /**
   * Save or update a user in localStorage.
   */
  async saveUser(user: User): Promise<void> {
    try {
      const users = this.getAllUsers();
      const existingIndex = users.findIndex((u) => u.id === user.id);

      if (existingIndex >= 0) {
        users[existingIndex] = user;
      } else {
        users.push(user);
      }

      localStorage.setItem(this.storageKey, JSON.stringify(users));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Retrieve a user by ID from localStorage.
   */
  async getUser(id: string): Promise<User | null> {
    try {
      const users = this.getAllUsers();
      return users.find((u) => u.id === id) || null;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Retrieve all users from localStorage.
   */
  getAllUsers(): User[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  /**
   * Delete a user by ID from localStorage.
   */
  async deleteUser(id: string): Promise<void> {
    try {
      const users = this.getAllUsers().filter((u) => u.id !== id);
      localStorage.setItem(this.storageKey, JSON.stringify(users));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

/**
 * Export a unified storage instance.
 * Prefers IndexedDB, falls back to localStorage if unavailable.
 */
export const storage = (() => {
  if (typeof window !== "undefined" && "indexedDB" in window) {
    return new Storage();
  } else {
    console.warn("⚠️ IndexedDB not available, falling back to localStorage");
    return new LocalStorageBackup();
  }
})();
