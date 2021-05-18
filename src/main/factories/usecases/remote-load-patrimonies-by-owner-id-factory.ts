import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { LoadPatrimoniesByOwnerId } from '@/domain/usecases'
import { RemoteLoadPatrimoniesByOwnerId } from '@/data/usecases'

export const makeRemoteLoadPatrimoniesByOwnerId = (): LoadPatrimoniesByOwnerId => {
  return new RemoteLoadPatrimoniesByOwnerId(makeAuthorizeHttpClientDecorator(), makeApiUrl('/owners'))
}
