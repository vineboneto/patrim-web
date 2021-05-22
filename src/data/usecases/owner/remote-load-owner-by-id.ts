import { LoadOwnerById } from '@/domain/usecases'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { HttpClient, HttpStatusCode } from '@/data/protocols'

export class RemoteLoadOwnerById implements LoadOwnerById {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async loadById (params: LoadOwnerById.Params): Promise<LoadOwnerById.Model> {
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
