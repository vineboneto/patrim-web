import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteAddOwner } from '@/data/usecases'
import { AddOwner } from '@/domain/usecases'

export const makeRemoteAddOwner = (): AddOwner => {
  return new RemoteAddOwner(makeAuthorizeHttpClientDecorator(), makeApiUrl('/owners'))
}
