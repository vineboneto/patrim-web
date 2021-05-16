import { RemoteDeletePatrimony } from '@/data/usecases'
import { DeletePatrimony } from '@/domain/usecases'
import { makeAuthorizeHttpClientDecorator } from '../decorators'
import { makeApiUrl } from '../http'

export const makeRemoteDeletePatrimony = (): DeletePatrimony => {
  return new RemoteDeletePatrimony(makeAuthorizeHttpClientDecorator(), makeApiUrl('/patrimonies'))
}
