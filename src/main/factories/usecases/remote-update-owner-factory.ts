import { RemoteUpdateOwner } from '@/data/usecases'
import { UpdateOwner } from '@/domain/usecases'
import { makeAuthorizeHttpClientDecorator } from '../decorators'
import { makeApiUrl } from '../http'

export const makeRemoteUpdateOwner = (id: number): UpdateOwner => {
  return new RemoteUpdateOwner(makeAuthorizeHttpClientDecorator(), makeApiUrl(`/owners/${id}`))
}
