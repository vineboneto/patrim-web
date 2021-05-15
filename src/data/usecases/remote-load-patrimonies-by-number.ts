import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError } from '@/domain/errors'
import { LoadPatrimoniesByNumber } from '@/domain/usecases'

export class RemoteLoadPatrimoniesByNumber implements LoadPatrimoniesByNumber {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async loadByNumber (params: LoadPatrimoniesByNumber.Params): Promise<LoadPatrimoniesByNumber.Model[]> {
    const httpResponse = await this.httpClient.request({
      method: 'get',
      url: `${this.url}/${params.number}/number`
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
    }
    return null
  }
}
