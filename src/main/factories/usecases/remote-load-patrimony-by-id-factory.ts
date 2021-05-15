import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { LoadPatrimonyById } from '@/domain/usecases'
import { RemoteLoadPatrimonyById } from '@/data/usecases'

export const makeRemoteLoadPatrimonyById = (id: number): LoadPatrimonyById => {
  return new RemoteLoadPatrimonyById(makeAuthorizeHttpClientDecorator(), makeApiUrl(`/patrimonies/${id}`))
}
