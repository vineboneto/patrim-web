import { HttpClient } from '@/data/protocols'
import { LoadPatrimoniesByNumber } from '@/domain/usecases'

export class RemoteLoadPatrimoniesByNumber implements LoadPatrimoniesByNumber {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async loadByNumber (params: LoadPatrimoniesByNumber.Params): Promise<LoadPatrimoniesByNumber.Model[]> {
    await this.httpClient.request({
      method: 'get',
      url: `${this.url}/${params.number}/number`
    })
    return null
  }
}
