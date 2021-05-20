import { RemoteUpdateSector } from '@/data/usecases'
import { UpdateSector } from '@/domain/usecases'
import { makeAuthorizeHttpClientDecorator } from '../decorators'
import { makeApiUrl } from '../http'

export const makeRemoteUpdateSector = (id: number): UpdateSector => {
  return new RemoteUpdateSector(makeAuthorizeHttpClientDecorator(), makeApiUrl(`/sectors/${id}`))
}
