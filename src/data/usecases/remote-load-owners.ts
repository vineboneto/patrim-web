import { HttpClient } from '@/data/protocols'
import { LoadOwners } from '@/domain/usecases'

export class RemoteLoadOwners implements LoadOwners {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async load (): Promise<LoadOwners.Model[]> {
    await this.httpClient.request({
      method: 'get',
      url: this.url
    })
    return null
  }
}
