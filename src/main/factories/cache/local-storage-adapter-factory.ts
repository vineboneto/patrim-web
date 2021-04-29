import { LocalStorageAdapter } from '@/infra/cache/local-storage'

export const makeLocalStorageAdapter = (): LocalStorageAdapter => {
  return new LocalStorageAdapter()
}
