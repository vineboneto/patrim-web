import { AddPatrimony } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError } from '@/domain/errors'

export class RemoteAddPatrimony implements AddPatrimony {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async add (params: AddPatrimony.Params): Promise<AddPatrimony.Model> {
    const httpResponse = await this.httpClient.request({
      body: params,
      method: 'post',
      url: this.url
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
    }
    return null
  }
}
