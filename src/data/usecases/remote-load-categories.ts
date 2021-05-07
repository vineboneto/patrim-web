import { HttpClient } from '@/data/protocols'
import { LoadCategories } from '@/domain/usecases'

export class RemoteLoadCategories implements LoadCategories {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async load (): Promise<LoadCategories.Model[]> {
    await this.httpClient.request({
      method: 'get',
      url: this.url
    })
    return null
  }
}
