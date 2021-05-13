import { LoadPatrimonyById } from '@/domain/usecases'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { HttpClient, HttpStatusCode } from '@/data/protocols'

export class RemoteLoadPatrimonyById implements LoadPatrimonyById {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async loadById (params: LoadPatrimonyById.Params): Promise<LoadPatrimonyById.Model> {
    const httpResponse = await this.httpClient.request({
      method: 'get',
      url: this.url
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.noContent:
      case HttpStatusCode.ok: return null
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}
