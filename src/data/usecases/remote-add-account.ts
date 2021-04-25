import { AddAccount } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { EmailInUseError } from '@/domain/errors'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly httpClient: HttpClient<RemoteAddAccount.Model>,
    private readonly url: string
  ) {}

  async add (params: AddAccount.Params): Promise<AddAccount.Model> {
    const httpResponse = await this.httpClient.request({
      method: 'post',
      body: params,
      url: this.url
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.forbidden: throw new EmailInUseError()
      default: return null
    }
  }
}

export namespace RemoteAddAccount {
  export type Model = AddAccount.Model
}
