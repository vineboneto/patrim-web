import { AddPatrimony } from '@/domain/usecases'
import { HttpClient } from '@/data/protocols'

export class RemoteAddPatrimony implements AddPatrimony {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async add (params: AddPatrimony.Params): Promise<AddPatrimony.Model> {
    await this.httpClient.request({
      body: params,
      method: 'post',
      url: this.url
    })
    return null
  }
}
