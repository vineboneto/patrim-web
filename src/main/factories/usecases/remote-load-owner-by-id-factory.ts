import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { LoadOwnerById } from '@/domain/usecases'
import { RemoteLoadOwnerById } from '@/data/usecases'

export const makeRemoteLoadOwnerById = (id: number): LoadOwnerById => {
  return new RemoteLoadOwnerById(makeAuthorizeHttpClientDecorator(), makeApiUrl(`/owners/${id}`))
}
