import { httpClient } from './httpClient'
import { toApiError } from './errors'
import type { RequestConfig } from './types'

export async function request<TResponse, TData = unknown>(config: RequestConfig<TData>) {
  try {
    const response = await httpClient.request<TResponse>(config)
    return response.data
  } catch (error) {
    throw toApiError(error)
  }
}
