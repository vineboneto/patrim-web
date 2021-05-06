import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteAddPatrimony } from '@/data/usecases'
import { AddPatrimony } from '@/domain/usecases'

export const makeRemoteAddPatrimony = (): AddPatrimony => {
  return new RemoteAddPatrimony(makeAuthorizeHttpClientDecorator(), makeApiUrl('/patrimonies'))
}
