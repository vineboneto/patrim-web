import { UpdateSector } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError, UnprocessableEntityError } from '@/domain/errors'

export class RemoteUpdateSector implements UpdateSector {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async update (params: UpdateSector.Params): Promise<UpdateSector.Model> {
    const httpResponse = await this.httpClient.request({
      method: 'put',
      body: params,
      url: this.url
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      case HttpStatusCode.unprocessableEntity: throw new UnprocessableEntityError('nome', params.name)
      default: throw new UnexpectedError()
    }
  }
}
