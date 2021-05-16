import { LoadPatrimoniesByCategoryId } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

export class RemoteLoadPatrimoniesByCategoryId implements LoadPatrimoniesByCategoryId {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async loadByCategoryId (params: LoadPatrimoniesByCategoryId.Params): Promise<LoadPatrimoniesByCategoryId.Model[]> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${params.id}/patrimonies?take=${params.take}&skip=${params.skip}`,
      method: 'get'
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.noContent:
      case HttpStatusCode.ok: return null
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}
