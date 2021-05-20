import { RemoteDeleteSector } from '@/data/usecases'
import { DeleteSector } from '@/domain/usecases'
import { makeAuthorizeHttpClientDecorator } from '../decorators'
import { makeApiUrl } from '../http'

export const makeRemoteDeleteSector = (): DeleteSector => {
  return new RemoteDeleteSector(makeAuthorizeHttpClientDecorator(), makeApiUrl('/sectors'))
}
