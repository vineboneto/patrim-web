import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { LoadCategories } from '@/domain/usecases'
import { RemoteLoadCategories } from '@/data/usecases'

export const makeRemoteLoadCategories = (): LoadCategories => {
  return new RemoteLoadCategories(makeAuthorizeHttpClientDecorator(), makeApiUrl('/categories'))
}
