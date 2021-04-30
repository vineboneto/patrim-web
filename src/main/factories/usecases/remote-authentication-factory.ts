import { RemoteAuthentication } from '@/data/usecases'
import { Authentication } from '@/domain/usecases'
import { makeApiUrl, makeAxiosHttpClient } from '../http'

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeAxiosHttpClient(), makeApiUrl('/login'))
}
