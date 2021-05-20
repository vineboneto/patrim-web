import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { LoadSectors } from '@/domain/usecases'
import { RemoteLoadSectors } from '@/data/usecases'

export const makeRemoteLoadSectors = (): LoadSectors => {
  return new RemoteLoadSectors(makeAuthorizeHttpClientDecorator(), makeApiUrl('/sectors'))
}
