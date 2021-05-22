import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { LoadSectorById } from '@/domain/usecases'
import { RemoteLoadSectorById } from '@/data/usecases'

export const makeRemoteLoadSectorById = (id: number): LoadSectorById => {
  return new RemoteLoadSectorById(makeAuthorizeHttpClientDecorator(), makeApiUrl(`/sectors/${id}`))
}
