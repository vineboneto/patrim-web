import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { LoadOwners } from '@/domain/usecases'
import { AccessDeniedError } from '@/domain/errors'

export class RemoteLoadOwners implements LoadOwners {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly url: string
  ) {}

  async load (): Promise<LoadOwners.Model[]> {
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
