import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteUpdateCategory } from '@/data/usecases'
import { UpdateCategory } from '@/domain/usecases'

export const makeRemoteUpdateCategory = (id: number): UpdateCategory => {
  return new RemoteUpdateCategory(makeAuthorizeHttpClientDecorator(), makeApiUrl(`/categories/${id}`))
}
