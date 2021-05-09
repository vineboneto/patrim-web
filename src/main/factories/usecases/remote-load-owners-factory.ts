import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { LoadOwners } from '@/domain/usecases'
import { RemoteLoadOwners } from '@/data/usecases'

export const makeRemoteLoadOwners = (): LoadOwners => {
  return new RemoteLoadOwners(makeAuthorizeHttpClientDecorator(), makeApiUrl('/owners'))
}
