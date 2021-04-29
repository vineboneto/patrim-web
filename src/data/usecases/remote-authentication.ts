import { Authentication } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { InvalidCredentialsError } from '@/domain/errors'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async auth (params: Authentication.Params): Promise<Authentication.Model> {
    const httpResponse = await this.httpClient.request({
      method: 'post',
      body: params,
      url: this.url
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: return null
    }
  }
}
