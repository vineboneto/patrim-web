import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { RemoteLoadPatrimonyByNumber } from '@/data/usecases'
import { LoadPatrimonyByNumber } from '@/domain/usecases'

export const makeLoadPatrimonyByNumber = (number: string): LoadPatrimonyByNumber => {
  return new RemoteLoadPatrimonyByNumber(makeAuthorizeHttpClientDecorator(), makeApiUrl('/patrimonies'))
}
