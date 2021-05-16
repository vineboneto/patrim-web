import { DeletePatrimony } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

export class RemoteDeletePatrimony implements DeletePatrimony {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async delete (params: DeletePatrimony.Params): Promise<DeletePatrimony.Model> {
    const httpResponse = await this.httpClient.request({
      method: 'delete',
      body: params,
      url: `${this.url}/${params.id}`
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}
