import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteUpdatePatrimony } from '@/data/usecases'
import { UpdatePatrimony } from '@/domain/usecases'

export const makeRemoteUpdatePatrimony = (id: number): UpdatePatrimony => {
  return new RemoteUpdatePatrimony(makeAuthorizeHttpClientDecorator(), makeApiUrl(`/patrimonies${id}`))
}
