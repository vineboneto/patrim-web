import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { LoadOwners } from '@/domain/usecases'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

export class RemoteLoadOwners implements LoadOwners {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async load (params: LoadOwners.Params): Promise<LoadOwners.Model> {
    const httpResponse = await this.httpClient.request({
      method: 'get',
      url: `${this.url}?take=${params.take}&skip=${params.skip}`
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.noContent:
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}
