import { LoadPatrimoniesByCategoryId } from '@/domain/usecases'
import { HttpClient } from '@/data/protocols'

export class RemoteLoadPatrimoniesByCategoryId implements LoadPatrimoniesByCategoryId {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async loadByCategoryId (params: LoadPatrimoniesByCategoryId.Params): Promise<LoadPatrimoniesByCategoryId.Model[]> {
    await this.httpClient.request({
      url: `${this.url}/${params.id}/patrimonies?take=${params.take}&skip=${params.skip}`,
      method: 'get'
    })
    return null
  }
}
