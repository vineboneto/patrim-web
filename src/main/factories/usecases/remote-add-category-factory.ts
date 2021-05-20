import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteAddCategory } from '@/data/usecases'
import { AddCategory } from '@/domain/usecases'

export const makeRemoteAddCategory = (): AddCategory => {
  return new RemoteAddCategory(makeAuthorizeHttpClientDecorator(), makeApiUrl('/categories'))
}
