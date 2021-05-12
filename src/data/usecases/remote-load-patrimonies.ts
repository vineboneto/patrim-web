import { LoadPatrimonies } from '@/domain/usecases'
import { HttpClient } from '@/data/protocols'

export class RemoteLoadPatrimonies implements LoadPatrimonies {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async load (): Promise<LoadPatrimonies.Model[]> {
    await this.httpClient.request({
      url: this.url,
      method: 'get'
    })
    return null
  }
}
