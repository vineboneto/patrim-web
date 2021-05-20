import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteAddSector } from '@/data/usecases'
import { AddSector } from '@/domain/usecases'

export const makeRemoteAddSector = (): AddSector => {
  return new RemoteAddSector(makeAuthorizeHttpClientDecorator(), makeApiUrl('/sectors'))
}
