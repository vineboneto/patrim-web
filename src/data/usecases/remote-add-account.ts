import { AddAccount } from '@/domain/usecases'
import { HttpClient } from '@/data/protocols'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly httpClient: HttpClient<RemoteAddAccount.Model>,
    private readonly url: string
  ) {}

  async add (params: AddAccount.Params): Promise<AddAccount.Model> {
    await this.httpClient.request({
      method: 'post',
      body: params,
      url: this.url
    })
    return null
  }
}

export namespace RemoteAddAccount {
  export type Model = AddAccount.Model
}
