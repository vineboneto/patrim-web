import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadCategories } from '@/domain/usecases'

export class RemoteLoadCategories implements LoadCategories {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async load (params: LoadCategories.Params): Promise<LoadCategories.Model> {
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
