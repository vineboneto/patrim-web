import { RemoteLoadPatrimonies } from '@/data/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'

export const makeRemoteLoadPatrimonies = (take: string , skip: string): RemoteLoadPatrimonies => {
  return new RemoteLoadPatrimonies(
    makeAuthorizeHttpClientDecorator(),
    makeApiUrl(`/patrimonies?skip=${skip}&take=${take}`)
  )
}
