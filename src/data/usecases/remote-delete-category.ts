import { DeleteCategory } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, LinkedDataError, UnexpectedError } from '@/domain/errors'

export class RemoteDeleteCategory implements DeleteCategory {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async delete (params: DeleteCategory.Params): Promise<DeleteCategory.Model> {
    const httpResponse = await this.httpClient.request({
      method: 'delete',
      body: params,
      url: `${this.url}/${params.id}`
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.unprocessableEntity: throw new LinkedDataError('categoria')
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}
