import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError } from '@/domain/errors'
import { LoadCategories } from '@/domain/usecases'

export class RemoteLoadCategories implements LoadCategories {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async load (): Promise<LoadCategories.Model[]> {
    const httpResponse = await this.httpClient.request({
      method: 'get',
      url: this.url
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
    }
    return null
  }
}
