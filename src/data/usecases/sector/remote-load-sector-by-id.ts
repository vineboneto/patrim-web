import { LoadSectorById } from '@/domain/usecases'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { HttpClient, HttpStatusCode } from '@/data/protocols'

export class RemoteLoadSectorById implements LoadSectorById {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async loadById (params: LoadSectorById.Params): Promise<LoadSectorById.Model> {
    const httpResponse = await this.httpClient.request({
      method: 'get',
      url: this.url
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.noContent:
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}
