import { Authentication } from '@/domain/usecases'
import { HttpClient } from '@/data/protocols'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async auth (params: Authentication.Params): Promise<Authentication.Model> {
    await this.httpClient.request({
      method: 'post',
      body: params,
      url: this.url
    })
    return null
  }
}
