import { LoadPatrimonyById } from '@/domain/usecases'
import { HttpClient } from '@/data/protocols'

export class RemoteLoadPatrimonyById implements LoadPatrimonyById {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async loadById (params: LoadPatrimonyById.Params): Promise<LoadPatrimonyById.Model> {
    await this.httpClient.request({
      method: 'get',
      url: this.url
    })
    return null
  }
}
