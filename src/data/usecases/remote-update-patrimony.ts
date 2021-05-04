import { UpdatePatrimony } from '@/domain/usecases'
import { HttpClient } from '@/data/protocols'

export class RemoteUpdatePatrimony implements UpdatePatrimony {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async update (params: UpdatePatrimony.Params): Promise<UpdatePatrimony.Model> {
    await this.httpClient.request({
      method: 'put',
      body: params,
      url: this.url
    })
    return null
  }
}
