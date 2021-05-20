import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteDeleteCategory } from '@/data/usecases'
import { DeleteCategory } from '@/domain/usecases'

export const makeRemoteDeleteCategory = (): DeleteCategory => {
  return new RemoteDeleteCategory(makeAuthorizeHttpClientDecorator(), makeApiUrl('/categories'))
}
