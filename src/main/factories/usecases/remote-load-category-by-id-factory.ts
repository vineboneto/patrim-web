import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { LoadCategoryById } from '@/domain/usecases'
import { RemoteLoadCategoryById } from '@/data/usecases'

export const makeRemoteLoadCategoryById = (id: number): LoadCategoryById => {
  return new RemoteLoadCategoryById(makeAuthorizeHttpClientDecorator(), makeApiUrl(`/categories/${id}`))
}
