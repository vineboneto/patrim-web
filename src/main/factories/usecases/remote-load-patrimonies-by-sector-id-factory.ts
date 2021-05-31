import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { LoadPatrimoniesBySectorId } from '@/domain/usecases'
import { RemoteLoadPatrimoniesBySectorId } from '@/data/usecases'

export const makeRemoteLoadPatrimoniesBySectorId = (): LoadPatrimoniesBySectorId => {
  return new RemoteLoadPatrimoniesBySectorId(makeAuthorizeHttpClientDecorator(), makeApiUrl('/sectors'))
}
