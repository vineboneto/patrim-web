import { UpdateOwner } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

export class RemoteUpdateOwner implements UpdateOwner {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async update (params: UpdateOwner.Params): Promise<UpdateOwner.Model> {
    const httpResponse = await this.httpClient.request({
      method: 'put',
      body: params,
      url: this.url
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}
