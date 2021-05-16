import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { LoadPatrimoniesByCategoryId } from '@/domain/usecases'
import { RemoteLoadPatrimoniesByCategoryId } from '@/data/usecases'

export const makeRemoteLoadPatrimoniesByCategoryId = (): LoadPatrimoniesByCategoryId => {
  return new RemoteLoadPatrimoniesByCategoryId(makeAuthorizeHttpClientDecorator(), makeApiUrl('/categories'))
}
