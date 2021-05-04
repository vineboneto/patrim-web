import { UpdatePatrimony } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnprocessableEntityError } from '@/domain/errors'

export class RemoteUpdatePatrimony implements UpdatePatrimony {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async update (params: UpdatePatrimony.Params): Promise<UpdatePatrimony.Model> {
    const httpResponse = await this.httpClient.request({
      method: 'put',
      body: params,
      url: this.url
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      case HttpStatusCode.unprocessableEntity: throw new UnprocessableEntityError(params.number)
    }
    return null
  }
}
