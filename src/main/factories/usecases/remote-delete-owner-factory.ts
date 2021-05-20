import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteDeleteOwner } from '@/data/usecases'
import { DeleteOwner } from '@/domain/usecases'

export const makeRemoteDeleteOwner = (): DeleteOwner => {
  return new RemoteDeleteOwner(makeAuthorizeHttpClientDecorator(), makeApiUrl('/owners'))
}
