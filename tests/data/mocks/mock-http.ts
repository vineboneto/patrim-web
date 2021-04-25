import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols'

export class HttpClientSpy<R = any> implements HttpClient<R> {
  params: HttpRequest
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async request (params: HttpRequest): Promise<HttpResponse<R>> {
    this.params = params
    return this.response
  }
}
