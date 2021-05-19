import { AddSector } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError, UnprocessableEntityError } from '@/domain/errors'

export class RemoteAddSector implements AddSector {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async add (params: AddSector.Params): Promise<AddSector.Model> {
    const httpResponse = await this.httpClient.request({
      body: params,
      method: 'post',
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
