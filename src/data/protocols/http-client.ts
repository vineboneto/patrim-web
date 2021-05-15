export interface HttpClient<R = any> {
  request (data: HttpRequest): Promise<HttpResponse<R>>
}

export enum HttpStatusCode {
  noContent = 204,
  ok = 200,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  unprocessableEntity = 422,
  serverError = 500
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete'

export type HttpRequest = {
  url: string
  method: HttpMethod
  headers?: any
  body?: any
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
}
