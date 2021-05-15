import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadPatrimonyByNumber } from '@/domain/usecases'

export class RemoteLoadPatrimonyByNumber implements LoadPatrimonyByNumber {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async loadByNumber (params: LoadPatrimonyByNumber.Params): Promise<LoadPatrimonyByNumber.Model> {
    const httpResponse = await this.httpClient.request({
      method: 'get',
      url: `${this.url}/${params.number}/number`
    })
    console.log(httpResponse)
    switch (httpResponse.statusCode) {
      case HttpStatusCode.noContent:
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}
