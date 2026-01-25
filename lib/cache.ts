/**
 * Simple in-memory cache utility
 * For production, consider using Redis
 */

interface CacheEntry<T> {
  data: T
  expiresAt: number
}

class SimpleCache {
  private cache: Map<string, CacheEntry<any>> = new Map()

  set<T>(key: string, data: T, ttlSeconds: number = 300) {
    const expiresAt = Date.now() + ttlSeconds * 1000
    this.cache.set(key, { data, expiresAt })
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key)
      return null
    }

    return entry.data as T
  }

  delete(key: string) {
    this.cache.delete(key)
  }

  clear() {
    this.cache.clear()
  }

  // Get or compute pattern
  async getOrCompute<T>(
    key: string,
    computeFn: () => Promise<T>,
    ttlSeconds: number = 300
  ): Promise<T> {
    const cached = this.get<T>(key)
    if (cached !== null) {
      return cached
    }

    const data = await computeFn()
    this.set(key, data, ttlSeconds)
    return data
  }
}

export const cache = new SimpleCache()

/**
 * Cache keys
 */
export const CacheKeys = {
  userChecklist: (userId: string) => `checklist:${userId}`,
  userProgress: (userId: string) => `progress:${userId}`,
  analytics: (type: string, params?: string) => `analytics:${type}${params ? `:${params}` : ""}`,
  search: (query: string) => `search:${query}`,
  userStats: (userId: string) => `stats:${userId}`,
}

