import { LoadPatrimoniesBySectorId } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

export class RemoteLoadPatrimoniesBySectorId implements LoadPatrimoniesBySectorId {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async loadBySectorId (params: LoadPatrimoniesBySectorId.Params): Promise<LoadPatrimoniesBySectorId.Model> {
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
