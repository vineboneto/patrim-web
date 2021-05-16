import { LoadPatrimoniesByOwnerId } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

export class RemoteLoadPatrimoniesByOwnerId implements LoadPatrimoniesByOwnerId {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async loadByOwnerId (params: LoadPatrimoniesByOwnerId.Params): Promise<LoadPatrimoniesByOwnerId.Model[]> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${params.id}/patrimonies?take=${params.take}&skip=${params.skip}`,
      method: 'get'
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.noContent:
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}
